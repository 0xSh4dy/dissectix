from dotenv import load_dotenv
import os
from gcloud import storage
from oauth2client.service_account import ServiceAccountCredentials
from loguru import logger

load_dotenv()

class CloudStorage:
    def __init__(self):
        self.client_id = os.getenv("CLIENT_ID")
        self.client_email = os.getenv("CLIENT_EMAIL")
        self.private_key = os.getenv("PRIVATE_KEY")
        self.private_key_id = os.getenv("PRIVATE_KEY_ID")
        self.credentials_dict = {
            "type":"service_account",
            "client_id":self.client_id,
            "client_email":self.client_email,
            "private_key":self.private_key,
            "private_key_id":self.private_key_id
        }
        self.project = os.getenv("GCLOUD_PROJECT")
        self.bucket_name = os.getenv("GCLOUD_BUCKET")

    def upload_file_to_cloud(self,file_path,file_name):
        try:
            logger.debug(f"Writing {file_path} | {file_name}")
            credentials = ServiceAccountCredentials.from_json_keyfile_dict(self.credentials_dict)
            client = storage.Client(credentials=credentials,project=self.project)
            bucket = client.get_bucket(self.bucket_name)
            blob = bucket.blob(file_name)
            blob.upload_from_filename(file_path)
            blob.make_public()
            return True,blob.public_url
        
        except Exception as e:
            logger.critical(e)
            return False,"Internal server error"
    
    def delete_file_from_bucket(self,file_name):
        try:
            credentials = ServiceAccountCredentials.from_json_keyfile_dict(self.credentials_dict)
            client = storage.Client(credentials=credentials,project=self.project)
            bucket = client.get_bucket(self.bucket_name)
            bucket.delete_blob(file_name)
            return True
        except Exception as e:
            logger.error(e)
            return False