from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChallengeSerializer
from .utils import get_disasm,generate_unique_id
from .cloudstorage import CloudStorage
from .models import Challenge
from constants import *
import base64
import json
import os
from loguru import logger
from django.shortcuts import get_object_or_404
from .disassembler.differ import get_diffed_values
import yaml
from authserver.models import DissectixUser
from authserver.serializers import LeaderboardDataSerializer,ProfileSerializer

class ChallengeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            chall_id = request.query_params.get("chall_id")
            if chall_id != None:
                chall_data = get_object_or_404(Challenge,chall_id=chall_id)
                data = ChallengeSerializer(chall_data)
                return Response({"detail":data.data},status=status.HTTP_200_OK)
            
            start = request.query_params.get("start")
            end = request.query_params.get("end")
            if start==None or end==None:
                start = 0
                end = Challenge.objects.count()
            difficulty = request.query_params.get("difficulty")
            query_set = Challenge.objects.order_by("chall_id")
            
            if difficulty!=None:
                query_set = query_set.filter(difficulty=difficulty)
            
            challenges = query_set[int(start):int(end)]
            serializer = ChallengeSerializer(challenges,many=True)
            return Response({"detail": json.dumps(serializer.data)}, status=200)
        except Exception as e:
            logger.error(e)
            return Response({"detail":"Internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self,request):
        try:
            author = request.user.username
            data = request.data.copy()
            data["author"] = author
            data["chall_id"] = generate_unique_id()
            data["is_public"] = True
            functions = data["functions"].split("|")
            difficulty = data["difficulty"]
            if difficulty == "easy":
                data["points"] = EASY_LEVEL
            elif difficulty == "medium":
                data["points"] = MEDIUM_LEVEL
            elif difficulty == "hard":
                data["points"] = HARD_LEVEL
            data["solve_percentage"] = json.dumps({author:0})
            (success,message,file_path) = get_disasm(data["language"],data["code"],data["name"],functions)

            if success==False:
                return Response({"detail":message},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            asm_code = json.dumps(message)
            encoded_asm_code = base64.b64encode(asm_code.encode()).decode()
            file_name = file_path.split("/")[-1]
            
            # Initialize empty url to ensure that files only get uploaded to cloud when everything is alright
            data["file_url"] = ""
            data["code"] = encoded_asm_code
            serializer = ChallengeSerializer(data=data)
            if serializer.is_valid():
                cloud_storage = CloudStorage()
                logger.critical("Starting file upload to cloud")
                # The name of the file to be stored in the bucket must be the challenge id
                upload_status,url = cloud_storage.upload_file_to_cloud(file_path,data["chall_id"])
                serializer.validated_data["file_url"] = url
                if upload_status == True:
                    serializer.save()
                    os.remove(file_path)
                    user_data = get_object_or_404(DissectixUser,username=author)
                    created_challs = user_data.created_challenges
                    created_challs[data["chall_id"]] = data["name"]
                    DissectixUser.objects.filter(username=author).update(created_challenges=created_challs)
                    return Response({"detail":"Challenge created"},status=status.HTTP_200_OK)
                else:
                    logger.error("Failed to upload file to cloud")
                    return Response({"detail":"Internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                logger.critical(serializer.errors)
                return Response({"detail":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.critical(e)
            return Response({"detail":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self,request):
        author = request.user.username
        chall_id = request.data["chall_id"]
        if chall_id==None:
            return Response({"detail":"Invalid fields"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        chall = get_object_or_404(Challenge,chall_id=chall_id)
        if chall.author == author:
            chall.delete()
            cloud_storage = CloudStorage()
            deletion_status = cloud_storage.delete_file_from_bucket(chall_id)
            if deletion_status:
                return Response({"detail":"Challenge deleted"},status=status.HTTP_200_OK)
            else:
                return Response({"detail":"Internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"detail":"Unauthorized"},status=status.HTTP_401_UNAUTHORIZED)

class CodeTestingView(APIView):
    def post(self,request):
        data = request.data
        try:
            code = data["code"]
            language = data["language"]
            functions = data["functions"]
            name = data["name"]
            mangledFuncs = data["mangledFunctions"]
            stats,disasm,file_path = get_disasm(language,code,name,["main","test"])

            try:
                os.remove(file_path)
            except Exception as e:
                logger.debug(e)
            if type(disasm)!=str:
                keys = disasm.keys()
                for funcn in mangledFuncs:
                    if funcn not in keys:
                        return Response({"detail":f"Please write the code for all the functions before testing","error":"true"},status=200)
            if stats==False:
                return Response({"detail":disasm,"error":"true"},status=status.HTTP_200_OK)
            else:
                return Response({"detail":json.dumps(disasm)},status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(e)
            return Response({"detail":"Error: " +"Internal server error","error":"true"},status=status.HTTP_200_OK)
        

class CodeSubmissionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            username = request.user.username
            data = request.data
            chall_id = data["chall_id"]
            submitted_code = data["code"]
            chall_data = get_object_or_404(Challenge,chall_id=chall_id)
            solves = chall_data.solve_percentage
            points = chall_data.points
            decoded_code = json.loads(base64.b64decode(chall_data.code.encode()).decode())
            functions = chall_data.functions.split("|")
            stats,user_disasm,file_path = get_disasm(chall_data.language,submitted_code,chall_data.name,functions)
            if stats== False:
                return Response({"detail":user_disasm,"error":"true"},status=status.HTTP_200_OK)
            else:
                decoded_disasm_yaml = yaml.dump(decoded_code)
                original_disasm_yaml = yaml.dump(user_disasm)
                result = get_diffed_values(decoded_disasm_yaml,original_disasm_yaml)
                result = yaml.safe_load(result)
                fn_keys = result.keys()
                matching_lines = 0
                total_lines = 0
                for fn_name in fn_keys:
                    delta = result[fn_name]["delta"]
                    matching_lines += delta[1]
                    total_lines += delta[3]
                
                percentage = 100*(matching_lines)//total_lines
                try:
                    prev_percentage = solves[username]
                except Exception as exp:
                    prev_percentage = 0

                # Author doesn't get any reward for solving his own challenge
                if percentage>prev_percentage and username!=chall_data.author:

                    chall_instance = Challenge.objects.filter(chall_id=chall_id)
                    solves[username] = percentage
                    chall_instance.update(solve_percentage=solves)
                    user = get_object_or_404(DissectixUser,username=username)

                    new_score = user.score + points*percentage//100
                    dissectixUserQuery = DissectixUser.objects.filter(username=username)
                    dissectixUserQuery.update(
                            score=new_score,
                    )
                    if percentage==100:
                        new_solve_count = user.solve_count+1
                        user.solved_challenges[chall_id] = chall_data.name
                        dissectixUserQuery.update(
                            solve_count=new_solve_count,
                            solved_challenges=user.solved_challenges
                            )

                return Response({"detail":percentage,"disasm":user_disasm},status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(e)
            return Response({"detail":"Internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LeaderboardView(APIView):
    def get(self,request):
        query_set = DissectixUser.objects.filter(score__gt=0).order_by("-score")
        data = LeaderboardDataSerializer(query_set,many=True).data.copy()
        return Response({"detail":json.dumps(data)},status=status.HTTP_200_OK)

class ProfileView(APIView):
    def post(self,request):
        try:
            username = request.data["username"]
            userdata = get_object_or_404(DissectixUser,username=username)
            serializer = ProfileSerializer(userdata)
            return Response({"detail":json.dumps(serializer.data)},status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(e)
            return Response({"detail":'Bad request'},status=status.HTTP_400_BAD_REQUEST)