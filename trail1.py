from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
import os

# app = Flask(__name__)
# basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Pavan123@localhost:5432/Sample'
# db = SQLAlchemy(app)
# ma = Marshmallow(app)

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
USER   = 'root'
PASS   = 'dhihub123'
HOST   = '35.244.127.254'
DBNAME = 'sample'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@{}/{}'.format(USER,PASS,HOST,DBNAME)
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Sample_db(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False)
    email = db.Column(db.String(120), unique=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id','username','email')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route("/")
def index():
    return render_template("trail1.html")

# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    username = request.json['username']
    email = request.json['email']
    
    new_user = Sample_db(username, email)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user)

# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    all_users = Sample_db.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)

if __name__ == '__main__':
    app.debug = True
    app.run()

