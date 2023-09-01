from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChallengeSerializer
from .utils import upload_file_to_cloud,get_disasm
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
            difficulty = data["difficulty"]
            if difficulty == "easy":
                data["points"] = EASY_LEVEL
            elif difficulty == "medium":
                data["points"] = MEDIUM_LEVEL
            elif difficulty == "hard":
                data["points"] = HARD_LEVEL
            data["solve_percentage"] = {author:0}
            raw_code = data["code"]
        except Exception as e:
            print(e)
        result = get_disasm("rust","fn main(){}","rustlangbin")
 
        if result[0]==False:
            return Response({"detail":result[1]})
        file_path = str(result[1])
        file_name = file_path.split("/")[-1]
        upload_status,url = upload_file_to_cloud(file_path,file_name)
        if upload_status==False:
            return Response({"detail":"Internal server error"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print(url)
        return Response({},status=status.HTTP_200_OK)
    