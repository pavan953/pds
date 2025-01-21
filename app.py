from flask import Flask, render_template, redirect, url_for, flash, request
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from bson.objectid import ObjectId
from package.forms import RegistrationForm, LoginForm, ResetPasswordForm
from datetime import datetime
import secrets
import pymongo

app = Flask(__name__)
app.config['SECRET_KEY'] = '1234'
app.config['MAIL_SERVER'] = 'saikiranjavalkar@gmail.com'  # Update with your email server details
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'saikiranjavalkar@gmail.com'
app.config['MAIL_PASSWORD'] = '1234'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

bcrypt = Bcrypt(app)
mail = Mail(app)

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['hackathon']
users_collection = db['users']
password_reset_requests_collection = db['password_reset_requests']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = {
            "email": form.email.data,
            "password": hashed_password,
            "created_at": datetime.utcnow()
        }
        users_collection.insert_one(user)
        flash('Your account has been created!', 'success')
        return redirect(url_for('signin'))
    return render_template('signup.html', form=form)

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    form = LoginForm()
    if form.validate_on_submit():
        user = users_collection.find_one({"email": form.email.data})
        if user and bcrypt.check_password_hash(user['password'], form.password.data):
            flash('Sign in successful!', 'success')
            return redirect(url_for('profile'))  # Update with the actual profile route
        else:
            flash('Invalid email or password', 'danger')
    return render_template('signin.html', form=form)

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user = users_collection.find_one({"email": form.email.data})
        if user:
            token = secrets.token_urlsafe(20)
            reset_request = {
                "email": user['email'],
                "token": token,
                "created_at": datetime.utcnow()
            }
            password_reset_requests_collection.insert_one(reset_request)
            reset_url = url_for('reset_password_token', token=token, _external=True)
            msg = Message('Password Reset Request', sender='noreply@example.com', recipients=[user['email']])
            msg.body = f'Please visit the following link to reset your password: {reset_url}'
            mail.send(msg)
            flash('Password reset email sent!', 'success')
            return redirect(url_for('signin'))
        else:
            flash('Email not found', 'danger')
    return render_template('resetpass.html', form=form)

@app.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password_token(token):
    reset_request = password_reset_requests_collection.find_one({"token": token})
    if not reset_request:
        flash('Invalid or expired token', 'danger')
        return redirect(url_for('reset_password'))
    
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user = users_collection.find_one({"email": reset_request['email']})
        if user:
            hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
            users_collection.update_one({"_id": user['_id']}, {"$set": {"password": hashed_password}})
            password_reset_requests_collection.delete_one({"_id": reset_request['_id']})
            flash('Your password has been updated!', 'success')
            return redirect(url_for('signin'))
        else:
            flash('User not found', 'danger')
    return render_template('reset_password_token.html', form=form)

@app.route('/userlogin/dashboard')
def userdash():
    return render_template('/userlogin/dashboard.html')
@app.route('/profile')
def profile():
    return "User Profile Page"  # Replace with actual profile page logic

if __name__ == '__main__':
    app.run(debug=True, port=5002)