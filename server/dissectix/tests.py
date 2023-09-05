from django.test import TestCase
import requests
import json

class ChallengeTest(TestCase):
    def setUp(self):
        url = "http://127.0.0.1:8000/auth/login/"
        data = {
            "username":"shady",
            "password":"aaaa"
        }
        response = requests.post(url,data=data)
        status_code = response.status_code
        
        assert status_code==200
        data = json.loads(response.text)
        token = data["token"]   
        self.token = token

    def test_rust_challenge_creation(self):
        chall_url = "http://127.0.0.1:8000/dissectix/create_challenge/"
        data = {
            "difficulty":"easy",
            "language":"rust",
            "code":'fn test(){println!("Hello world!")} fn main(){test();}',
            "name":"simplerust",
            "functions":"main|test"
        }
        headers = {
            "Authorization":f"Token {self.token}"
        }
        response = requests.post(chall_url,data=data,headers=headers)
        print(response.status_code)
        print(response.text)

    # def test_c_challenge_creation(self):
    #     chall_url = "http://127.0.0.1:8000/dissectix/create_challenge/"
    #     data = {
    #         "difficulty":"easy",
    #         "language":"c",
    #         "code":'#include<stdio.h> \n void test(){puts("Hello world");} int main(){test();return 0;}',
    #         "name":"simplec",
    #         "functions":"main|test"
    #     }
    #     headers = {
    #         "Authorization":f"Token {self.token}"
    #     }
    #     response = requests.post(chall_url,data=data,headers=headers)
    #     print(response.status_code)
    #     print(response.text)
    
    # def test_cpp_challenge_creation(self):
    #     chall_url = "http://127.0.0.1:8000/dissectix/create_challenge/"
    #     data = {
    #         "difficulty":"easy",
    #         "language":"cpp",
    #         "code":'#include<bits/stdc++.h> \n void test(){std::cout<<"Hello world"<<std::endl;} int main(){test();return 0;}',
    #         "name":"simplecpp",
    #         "functions":"main|test"
    #     }
    #     headers = {
    #         "Authorization":f"Token {self.token}"
    #     }
    #     response = requests.post(chall_url,data=data,headers=headers)
    #     print(response.status_code)
    #     print(response.text)