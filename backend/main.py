from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Study Space API is running"}
