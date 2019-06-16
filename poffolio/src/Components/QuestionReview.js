import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
// import Header from '../Header'

class QuestionReview extends Component {
    constructor(){
        super()
        this.state = {questions: [], subQuestions:[], users:[], subUsers:[], surveys:[], SurveyID:"1", data: "some default data"};
        this.SurveyID = "";
        // this.deleteOnClick = this.deleteOnClick.bind(this)
        this.updateOnClick = this.updateOnClick.bind(this)
        this.checkboxOnClick = this.checkboxOnClick.bind(this)
        this.submitOnClick = this.submitOnClick.bind(this)
        this.changeOptionSurveyList = this.changeOptionSurveyList.bind(this)
        this.deleteOnClick = this.deleteOnClick.bind(this)
        // this.deleteHandler = this.deleteHandler.bind(this)
        // this.showmore = this.showmore.bind(this);
    }
    
    componentDidMount(){
        fetch('https://feedbackmodule.appspot.com/user/data')
            .then(response => response.json())
            .then(json => this.setState({questions:json}));

        fetch('https://feedbackmodule.appspot.com/user/info')
            .then(response => response.json())
            .then(json => this.setState({users:json}));
        fetch('https://feedbackmodule.appspot.com/user/survey')
            .then(response => response.json())
            .then(json => this.setState({surveys:json}));
    }

    changeOptionSurveyList(){
        var value = document.getElementById("surveySelect").value
        this.SurveyID = value
        this.setState({SurveyID: value})
        
    }

    fetchQuestions = () => {
    }

    updateOnClick(data){
        this.setState({data})
    }
    deleteOnClick(SurveyID, que_id){
        var anchor = document.getElementById(que_id)
        console.log(anchor)
        if(anchor != null){
            anchor.onclick = function(){
                console.log('https://feedbackmodule.appspot.com/user/que/delete' + '/' + SurveyID + '/' + que_id)
                fetch('https://feedbackmodule.appspot.com/user/que/delete' + '/' + SurveyID + '/' + que_id,{method:'DELETE'})
                .then(response => response.json())
                .catch(err => {
                    // location.
                   alert("unsuccessfull Delete!!!!")
                })
            }
        }
        
        // var anchors = document.querySelectorAll(".deleteAnchors")
        // for(var i = 0; i < anchors.length; i++){
        //     anchors[i].addEventListener('click', deleteHandler(SurveyID, que_id), false)
        //     break;
        // }
        // function deleteHandler(SurveyID, que_id){
        //     console.log(SurveyID, "----", que_id)
        // }
        // if(document.getElementById(que_id).onclick == true)
        // {
        //     console.log(que_id)
        //     fetch('http://127.0.0.1:5000/user/que/delete/' + '/' + SurveyID + '/' + que_id,{method:'DELETE'})
        //     .then(response => {
        //     response.json()
        //     alert("The Question is deleted!!!!")
        //     })
        //     .catch(err => {
        //        alert("unsuccessfull Delete!!!!")
        //     })
        // }
    }
    
    
    checkboxOnClick(){
        
    }
    submitOnClick(){
        var userCheck = []
        let data = {questions:[], subUsers:[]}
        // data.questions = this.state.questions
        
        for (var i = 0 ; i < this.state.users.length; i++){
            userCheck[i] = document.getElementById(this.state.users[i].UID)
        }
        for (var j = 0 ; j < this.state.users.length; j++){
            if(userCheck[j].checked === true){
                data.subUsers.push(this.state.users[j].UID)
            }
        }
        for (var k = 0; k < this.state.questions.length; k++){
            if(this.state.questions[k].SurveyID == this.state.SurveyID){
                data.questions.push(this.state.questions[k])
            }
        }
        axios.post('https://feedbackmodule.appspot.com/user/submit', data)
            .then(response => {
                console.log(response)
            })
            .catch(error =>
                console.log(error)
            )
        alert("Survey is summited!!!")
        
    }

    render() {
        let surveySelect = document.getElementById("surveySelect")
        this.state.surveys.map(survey => {
        const{SurveyID, Survey_Title} = survey
        var newOption = document.createElement("option")
        newOption.id = SurveyID
        newOption.value = SurveyID
        newOption.text = Survey_Title
        if(surveySelect != null && surveySelect.length < this.state.surveys.length)
            surveySelect.add(newOption)
        })
        return(
            <div className="mainForm">
                {/* {
                    React.cloneElement(this.props.children, {data: this.state.data, setData: this.updateOnClick})
                } */}
                <div className="usersForm">
                {
                    this.state.users.map(user => {
                        const {Name, UID} = user
                        let form = <div></div>
                        form = 
                                <div className="userForm">
                                    <input type="checkbox" id={UID} onClick={this.checkboxOnClick}/>{Name}
                                </div>
                        return(
                            <div key={UID}>
                                {form}
                                <br/>
                            </div>
                        )
                    })
                }
                
                <div className="userForm">
                    <button type="submit" onClick={this.submitOnClick}>Submit</button>
                </div>
                </div>

                <div className="questionForm">
                    <br/>
                    <h2>Questions review</h2>
                    <div className="row table">
                        <div className="col span-1-of-10">
                        Survey:
                        </div>
                        <div className="col span-2-of-10"> 
                            <select id="surveySelect" onChange={this.changeOptionSurveyList}>
                            </select>
                        </div>
                    </div>
                    {

                        this.state.questions.map(ques => {
                        const {SurveyID, optionA, optionB, optionC, optionD, que_id, question } = ques;
                        let que = <div></div>
                        let opA = <div></div>
                        let opB = <div></div>
                        let opC = <div></div>
                        let opD = <div></div>
                        let form = <div></div>
                        // if(SurveyID === this.state.SurveyID){
                        //     console.log("equal")
                        // }
                        // console.log(this.state.SurveyID)
                        if(SurveyID == this.state.SurveyID){
                            
                            que =   <div className="row">
                                    <div className="col span-1-of-1 quesTitle quesLength">
                                        <strong>{que_id}. {question}</strong>
                                    </div>
                                </div>
                                if(optionA != null){
                                    opA = 
                                        <div className="row">
                                            <div className="col span-1-of-10">A:</div>
                                            <div className="col span-2-of-10">{optionA}</div>
                                        </div>
                                }
                                if(optionB != null){
                                    opB = 
                                        <div className="row">
                                            <div className="col span-1-of-10">B:</div>
                                            <div className="col span-2-of-10">{optionB}</div>
                                            
                                        </div>
                                }
                                if(optionC != null){
                                    opC = 
                                        <div className="row">
                                            <div className="col span-1-of-10">C:</div>
                                            <div className="col span-2-of-10">{optionC}</div>
                                        </div>
                                }
                                if(optionD != null){
                                    opD = 
                                        <div className="row">
                                            <div className="col span-1-of-10">D:</div>
                                            <div className="col span-2-of-10">{optionD}</div>
                                        </div>
                                }
                                
                                form = 
                                        <div className="row table questionItem" key={que_id} >
                                            {que}
                                            {opA}
                                            {opB}
                                            {opC}
                                            {opD}
                                            <div className="quesLength">
                                                <Link to="/update_question" >Update</Link>
                                                {/* <a className="col span-1-of-4" href="/update_question" onClick={this.updateOnClick()}>Update</a> */}
                                                
                                                <a className="col span-1-of-4 deleteAnchors" id={que_id} href="#" onClick={this.deleteOnClick(SurveyID, que_id)}>Delete</a>
                                                <div className="col span-3-of-3"></div>
                                            </div>
                                            
                                            <br/>
                                            {/* <hr/> */}
                                        </div>
                           
                            return (
                                <div key={que_id}>
                                    {form}
                                </div>
                            )
                        }
                        
                    })
                    }
                </div>
            </div>
        )
    }
}

export default QuestionReview