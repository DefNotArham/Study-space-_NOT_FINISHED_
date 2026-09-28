import os
from dotenv import load_dotenv

from mailjet_rest import Client

load_dotenv()

api_key = os.getenv("MJ_API_KEY")
secret_key = os.getenv("MJ_SECRET_KEY")

mailjet = Client(
    auth=(api_key, secret_key)
)

def send_test_email():
    data = {
        "Messages": [
            {
                "From": {
                    "Email": "arhamkabir231@gmail.com",
                    "Name": "Study Space"
                },
                "To": [
                    {
                        "Email": "arhamkabiralt231@gmail.com",
                        "Name": "Arham"
                    }
                ],
                "Subject": "Study Space Test",
                "TextPart": "Hello from Study Space!",
                "HTMLPart": "<h1>Hello from Study Space!</h1><p>Email is working.</p>"
            }
        ]
    }

    result = mailjet.send.create(data=data)

    print(result.status_code)
    print(result.json())


send_test_email()