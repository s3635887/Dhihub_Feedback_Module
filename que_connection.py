from flask import Flask, request, jsonify, render_template 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from slackclient import SlackClient
import json
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Pavan123@localhost:5432/Sample'
USER   = 'root'
PASS   = 'dhihub123'
HOST   = '35.244.127.254'
DBNAME = 'sample'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@{}/{}'.format(USER,PASS,HOST,DBNAME)
slack_token = 'xoxb-575060474148-600534221555-p4pSLvMQO4ZdbognZ9Z9PiFu'
sc = SlackClient(slack_token)
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Question_db(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(80), unique=False)

    def __init__(self, question):
        self.question = question
        
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id','question')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    question = request.json['question']
    print(question)
    new_question = Question_db(question)
    # db.session.add(new_question)
    # db.session.commit()
    print(sc.api_call
    (
        "chat.postMessage",
        channel = "#random",
        text = question,
        as_user = False 	
    )
    )

    return jsonify(new_question)

# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    all_questions = Question_db.query.all()
    result = users_schema.dump(all_questions)
    return jsonify(result.data)

if __name__ == '__main__':
    app.debug = True
    app.run()

