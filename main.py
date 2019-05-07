from flask import Flask, request, jsonify, render_template, make_response, Response 
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
SLACK_VERIFICATION_TOKEN = 'QKeDPPoqJ4PfNm99ch0v1SUc'
sc = SlackClient(slack_token)
db = SQLAlchemy(app)
ma = Marshmallow(app)


#Helper for verifying that requests came from Slack
def verify_slack_token(request_token):
    if SLACK_VERIFICATION_TOKEN != request_token:
        print("Error: invalid verification token!")
        print("Received {} but was expecting {}".format(request_token, SLACK_VERIFICATION_TOKEN))
        return make_response("Request contains invalid Slack verification token", 403)

class Survey(db.Model):
    SurveyID = db.Column(db.Integer, primary_key=True)
    Survey_Title = db.Column(db.String(200), unique=False, nullable =False )
    
    def __init__(self,SurveyID,Survey_Title):
        self.SurveyID = SurveyID
        self.Survey_Title = Survey_Title

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('SurveyID','Survey_Title')
user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Question(db.Model):
    que_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    SurveyID = db.Column(db.Integer, db.ForeignKey('survey.SurveyID'),primary_key=True,autoincrement = False)
    question_type = db.Column(db.String(100),nullable=False)
    question = db.Column(db.String(300),nullable=False)
    optionA = db.Column(db.String(100))
    optionB = db.Column(db.String(100))
    optionC = db.Column(db.String(100))
    optionD = db.Column(db.String(100))
    
    def __init__(self,SurveyID,question_type,question,optionA,optionB,optionC,optionD):
        self.question_type = question_type
        self.SurveyID = SurveyID
        self.question = question
        self.optionA = optionA
        self.optionB = optionB
        self.optionC = optionC
        self.optionD = optionD

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('que_id','SurveyID','question_type','question','optionA','optionB','optionC','optionD')

user_schema1 = UserSchema()
users_schema1 = UserSchema(many=True)

class User_info(db.Model):
    UID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(300))

    def __init__(self, UID,Name):
        self.UID = UID
        self.Name = Name
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('UID','Name')
user_schema2 = UserSchema()
users_schema2 = UserSchema(many=True)


class Answer(db.Model):
    UID = db.Column(db.Integer, db.ForeignKey('user_info.UID'),primary_key=True)
    que_id = db.Column(db.Integer, db.ForeignKey('question.que_id'),primary_key=True)
    SurveyID = db.Column(db.Integer, db.ForeignKey('survey.SurveyID'),primary_key=True)
    answer = db.Column(db.String(50), nullable=False)

    def __init__(self, UID,que_id,answer,SurveyID):
        self.UID = UID
        self.que_id = que_id
        self.SurveyID = SurveyID
        self.answer = answer

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('UID','que_id','SurveyID','answer')

user_schema3 = UserSchema()
users_schema3 = UserSchema(many=True)



@app.route("/user", methods=["POST"])
def add_user():
    question1 = request.json['question']
    op_a = request.json['optionA']
    op_b = request.json['optionB']
    op_c = request.json['optionC']
    op_d = request.json['optionD']
    
    print(question1,op_a,op_b,op_c,op_d)
    new_question = Question(1,'Multiple Choice',question1,op_a,op_b,op_c,op_d)
    print(new_question)
    db.session.add(new_question)
    db.session.commit()


    attachments_json = [
    {
        "fallback": "Upgrade your Slack client to use messages like these.",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "callback_id": "menu_options_2319",
        "actions": [
            {
                "name": "low",
                "text": ":smile:",
                "type": "button",
                "value": "Go to Hell man!!!!"
            },
            {
                "name": "high",
                "text": "HIGH",
                "type": "button",
                "value": "Good Boy!!"
            }
        ]
    }
]
    # print(sc.api_call
    # (
    #     "chat.postMessage",
    #     channel = "#random",
    #     text = question,
    #     as_user = False 	
    # )
    # )

    return jsonify(new_question)

if __name__ == '__main__':
    app.debug = True
    app.run()







