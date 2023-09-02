from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChallengeSerializer
from .utils import upload_file_to_cloud,get_disasm,generate_unique_id
from .models import Challenge
from constants import *

class ChallengeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.user.email)
        return Response({"detail": "works"}, status=200)
    
    def post(self,request):
        try:
            author = request.user.username
            data = request.data
            data["author"] = author
            data["chall_id"] = generate_unique_id()
            difficulty = data["difficulty"]
            
            if difficulty == "easy":
                data["points"] = EASY_LEVEL
            elif difficulty == "medium":
                data["points"] = MEDIUM_LEVEL
            elif difficulty == "hard":
                data["points"] = HARD_LEVEL
            data["solve_percentage"] = {author:0}
            result = get_disasm(data["language"],data["code"],data["name"])
            
            if result[0]==False:
                return Response({"detail":result[1]})
            
            file_path = str(result[1])
            file_name = file_path.split("/")[-1]
            upload_status,url = upload_file_to_cloud(file_path,file_name)
            
            if upload_status==False:
                return Response({"detail":"Internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                data["file_url"] = url
                serializer = ChallengeSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"detail":"Challenge created"},status=status.HTTP_200_OK)
                else:
                    return Response({"detail":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self,request):
        chall_id = request.data["chall_id"]
        author = request.user.username
        challenge = Challenge.objects.get(chall_id=chall_id)
        if challenge.author == author:
            challenge.delete()
            return Response({"detail":"Deleted challenge"},status=status.HTTP_200_OK)
        return Response({"detail":"Deletion failed"},status=status.HTTP_403_FORBIDDEN)

    