import os
from dotenv import load_dotenv

from mailjet_rest import Client

load_dotenv()

api_key = os.getenv("MJ_API_KEY")
secret_key = os.getenv("MJ_SECRET_KEY")

mailjet = Client(
    auth=(api_key, secret_key)
)