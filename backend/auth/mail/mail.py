import os

from dotenv import load_dotenv
from mailjet_rest import Client
from pathlib import Path


load_dotenv()

api_key = os.getenv("MJ_API_KEY")
secret_key = os.getenv("MJ_SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

mailjet = Client(
    auth=(api_key, secret_key),
    version="v3.1"
)


def send_verification_email(user_email, verification_token):

    verification_email_path = Path(__file__).parent / "templates" / "verification_email.html"
    verification_email_html = verification_email_path.read_text(encoding="utf-8")

    verification_url = (f"{FRONTEND_URL}/verify-email?token={verification_token}")

    html = verification_email_html.replace(
        "{{verification_url}}",
        verification_url
    )

    data = {
        "Messages": [
            {
                "From": {
                    "Email": "arhamkabir231@gmail.com",
                    "Name": "Study Space"
                },
                "To": [
                    {
                        "Email": user_email
                    }
                ],
                "Subject": "Verify your Study Space email",
                "HTMLPart": html
            }
        ]
    }

    result = mailjet.send.create(data=data)

    print(result.status_code)
    print(result.json())

def send_forgot_password_email(user_email):