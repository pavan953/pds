from datetime import datetime
from flask_pymongo import PyMongo

class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.created_at = datetime.utcnow()

class PasswordResetRequest:
    def __init__(self, email, token):
        self.email = email
        self.token = token
        self.created_at = datetime.utcnow()
