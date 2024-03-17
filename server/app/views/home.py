from app import app
from flask import redirect

hosted_url = "https://task-distribution-service.vercel.app/"


@app.get("/")
def home():
    return redirect(hosted_url)
