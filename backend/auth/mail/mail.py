import os
import resend

from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_test_email():

    response = resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": "arhamkabir231@gmail.com",
        "subject": "Study Space Test",
        "html": "<h1>Hello from Study Space!</h1><p>Email is working.</p>",
    })

    return response


send_test_email()