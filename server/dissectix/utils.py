from dotenv import load_dotenv
import os
from gcloud import storage
from oauth2client.service_account import ServiceAccountCredentials
from .disassembler.disassembler import disasm_func
import string
import random
import subprocess
import uuid

load_dotenv()

def generate_random_name(l):
    rand_str = random.choices(string.ascii_lowercase,k=l)
    return ''.join(rand_str)

def get_disasm(language,code,name):
    name = name.replace("_","")
    random_filename = name +"_"+ generate_random_name(10)
    file_path = "/tmp/"+random_filename
    # disasm = disasm_func("/tmp/a","c",["main"])
    if language == "c":
        file_path += ".c"
    elif language == "cpp":
        file_path += ".cpp"
    elif language == "go":
        file_path += ".go"
    elif language == "rust":
        file_path += ".rs"
    
    with open(file_path,"w") as f:
        f.write(code)
    return compile_code(language,file_path)

def run_shell_command(command_list):
    process = subprocess.Popen(command_list,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    stderr = process.stderr.read()
    stdout = process.stdout.read()
    if len(stderr)>0:
        return False,stderr.decode()
    return True,stdout.decode()


def compile_code(language,file_path):
    raw_name = str(file_path).split(".")[0]
    if language == "c":
        result = run_shell_command(["gcc",file_path,"-o",raw_name])
    elif language == "cpp":
        result = run_shell_command(["g++",file_path,"-o",raw_name])
    elif language == "go":
        pass
    elif language == "rust":
        result = run_shell_command(["rustc",file_path,"-o",raw_name])
    else:
        result = False,"Language not supported"
    if result[0] == False:
        return False,result[1]

    return True,raw_name

def upload_file_to_cloud(file_path,file_name):
    client_id = os.getenv("CLIENT_ID")
    client_email = os.getenv("CLIENT_EMAIL")
    private_key = os.getenv("PRIVATE_KEY")
    private_key_id = os.getenv("PRIVATE_KEY_ID")
    credentials_dict = {
        "type":"service_account",
        "client_id":client_id,
        "client_email":client_email,
        "private_key":private_key,
        "private_key_id":private_key_id
    }
    try:
        project = os.getenv("GCLOUD_PROJECT")
        bucket_name = os.getenv("GCLOUD_BUCKET")
        credentials = ServiceAccountCredentials.from_json_keyfile_dict(credentials_dict)
        client = storage.Client(credentials=credentials,project=project)
        bucket = client.get_bucket(bucket_name)
        blob = bucket.blob(file_name)
        blob.upload_from_filename(file_path)
        blob.make_public()
        return True,blob.public_url
    
    except Exception as e:
        return False,"Internal server error"
    

def generate_unique_id():
    return str(uuid.uuid4())