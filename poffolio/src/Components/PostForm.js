import React, {Component} from 'react'
import axios from 'axios'
class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            surveys:[],
            SurveyID:"1",
            object:{
                surveyID:"",
                question:"",
                optionA:"",
                optionB:"",
                optionC:"",
                optionD:"",
                questionType:4
            },
            objectSurvey:{
                id:"",
                title:""
            }
        }
        this.SurveyID = "";
        this.survey = {id:"", title:""}
        this.changeOptionSurveyList = this.changeOptionSurveyList.bind(this)
        this.changeOption = this.changeOption.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.submitCreateSurvey = this.submitCreateSurvey.bind(this)
    }

componentDidMount(){
    fetch('https://feedbackmodule.appspot.com/user/survey')
        .then(response => response.json())
        // .then(json => this.data.surveys = json)
        .then(json => this.setState({surveys: json}))
        // .then(json => this.setState({questions:json}));
    
}
changeOptionSurveyList(){
    var value = document.getElementById("surveySelect").value
    this.SurveyID = value
    this.setState({SurveyID: value})
    
}
changeOption(){
    var value = document.getElementById("mySelect").value
    if(value === "FourOptionQuestion"){
        this.setState({object:{questionType:4}})
    }
    if(value === "ThreeOptionQuestion"){
        this.setState({object:{questionType:3}})
    }
    if(value === "TwoOptionQuestion"){
        this.setState({object:{questionType:2}})
    }
    if(value === "ShortQuestion"){
        this.setState({object:{questionType:1}})
    }
    
}

changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

submitCreateSurvey(){
    var surveyID = parseInt(this.state.surveys[this.state.surveys.length - 1].SurveyID, 10)  + 1
    var surveyTitle  = document.getElementById("surveyTitle").value
    // this.setState({objectSurvey:{id: surveyID, title: surveyTitle}})
    this.survey.id = surveyID
    this.survey.title = surveyTitle
    // console.log(this.state.objectSurvey)
    // this.setState({objectSurvey:{id:}})
    
    if(surveyTitle != ""){
        fetch('https://feedbackmodule.appspot.com/user/survey', {
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.survey)
        })
        alert("New survey is created!!!")
        // document.getElementById("surveyTitle").value = ""
        // .then(response => {
        //     this.setState(prevState => ({
        //         surveys:[this.survey, ...prevState.surveys]
        //     }))
        // })
        
        
    }
    else
        alert("Survey Title cannot be null!!!!")

    
}

submitHandler = e => {
    var value = document.getElementById("mySelect").value
    var opQ = document.getElementById("taTitle").value
    var opA = ""
    var opB = ""
    var opC = ""
    var opD = ""
    var surveyID = document.getElementById("surveySelect").value
    if(value === "FourOptionQuestion"){
        opA = document.getElementById("opA4").value
        opB = document.getElementById("opB4").value
        opC = document.getElementById("opC4").value
        opD = document.getElementById("opD4").value
        if(opQ === "" || opA === "" || opB === "" || opC === "" || opD === ""){
            alert("can not submit empty element!")
        }
        else{
            this.state.object.question = opQ
            this.state.object.optionA = opA
            this.state.object.optionB = opB
            this.state.object.optionC = opC
            this.state.object.optionD = opD
            this.state.object.surveyID = surveyID
            fetch('http://127.0.0.1:5000/user', {
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.object)
            })
            .then(response => {
                console.log(response)
            })
            .catch(error =>
                console.log(error)
            )
            document.getElementById("taTitle").value = ""
            document.getElementById("opA4").value = ""
            document.getElementById("opB4").value = ""
            document.getElementById("opC4").value = ""
            document.getElementById("opD4").value = ""
            alert("Your question is submitted!")
        }
    }


    if(value === "ThreeOptionQuestion"){
        opA = document.getElementById("opA3").value
        opB = document.getElementById("opB3").value
        opC = document.getElementById("opC3").value
        if(opQ === "" || opA === "" || opB === "" || opC === ""){
            alert("Cannot submit empty question!")
        }
        else{
            // this.setState({question:opQ, optionA:"Yes", optionB:"No", optionC:"", optionD:""})
            this.state.object.question = opQ
            this.state.object.optionA = opA
            this.state.object.optionB = opB
            this.state.object.optionC = opC
            this.state.object.optionD = null
            this.state.object.surveyID = surveyID
            axios.post('https://feedbackmodule.appspot.com/user', this.state.object)
            .then(response => {
                console.log(response)
            })
            .catch(error =>
                console.log(error)
            )
            document.getElementById("taTitle").value = ""
            document.getElementById("opA3").value = ""
            document.getElementById("opB3").value = ""
            document.getElementById("opC3").value = ""
            alert("Your question is submitted!")
        }
    }

    if(value === "TwoOptionQuestion"){
        opA = document.getElementById("opA2").value
        opB = document.getElementById("opB2").value
        if(opQ === "" || opA === "" || opB === ""){
            alert("Cannot submit empty question!")
        }
        else{
            // this.setState({question:opQ, optionA:"Yes", optionB:"No", optionC:"", optionD:""})
            this.state.object.question = opQ
            this.state.object.optionA = opA
            this.state.object.optionB = opB
            this.state.object.optionC = null
            this.state.object.optionD = null
            this.state.object.surveyID = surveyID
            axios.post('https://feedbackmodule.appspot.com/user', this.state.object)
            .then(response => {
                console.log(response)
            })
            .catch(error =>
                console.log(error)
            )
            document.getElementById("taTitle").value = ""
            document.getElementById("opA2").value = ""
            document.getElementById("opB2").value = ""
            alert("Your question is submitted!")
        }
    }

    if(value === "ShortQuestion"){
        if(opQ === ""){
            alert("Cannot submit empty question!")
        }
        else{
            this.state.object.question = opQ
            this.state.object.optionA = null
            this.state.object.optionB = null
            this.state.object.optionC = null
            this.state.object.optionD = null
            this.state.object.surveyID = surveyID
            fetch('https://feedbackmodule.appspot.com/user', {
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.object)
            })



            document.getElementById("taTitle").value = ""
            alert("Your question is submitted!")
        } 
    }
    e.preventDefault()
    console.log(this.state.object)
    }

render() {
    let bio = React.createElement('div', null, null)
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
    if(this.state.object.questionType === 4){
            
        bio =   <div >
                        <br/>
                        <br/>
                        <div className="text">
                            A:<input id="opA4" type="text" 
                                    // name="optionA"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div className="text">
                            B:<input id="opB4" type="text"
                                    // name="optionB"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div className="text">
                            C:<input id="opC4" type="text"
                                    // name="optionC"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div className="text">
                            D:<input id="opD4" type="text"
                                    // name="optionD"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                    </div>
        }
        if(this.state.object.questionType === 3){
            bio =   <div >
                        <br/>
                        <br/>
                        <div className="text">
                            A:<input id="opA3" type="text" 
                                    // name="optionA"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div className="text">
                            B:<input id="opB3" type="text"
                                    // name="optionB"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div className="text">
                            C:<input id="opC3" type="text"
                                    // name="optionC"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                    </div>
        }
        if(this.state.object.questionType === 2){
            bio =   <div >
                        <br/>
                        <br/>
                        <div className="text">
                            A:<input id="opA2" type="text" 
                                    // name="optionA"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div className="text">
                            B:<input id="opB2" type="text"
                                    // name="optionB"
                                    onChange={this.changeHandler}
                                    />
                        </div>
                    </div>
        }
        if(this.state.object.questionType === 1){
            bio = <div></div>
        }

        return (
                <div className="mainForm">
                    <div className="logoForm">
                        <img src="/resources/css/img/Logo.gif"/>
                    </div>
                    <div className="questionForm">
                        <h2>Questionnaire</h2>
                        <div className="createSurveyForm">
                            <input id="surveyTitle" type="text"></input>
                            <button type="button" onClick={this.submitCreateSurvey}>New Survey</button>
                        </div>
                        <form onSubmit={this.submitHandler}>
                            <div className="savingForm">
                                Survey:
                                
                                <select id="surveySelect" onChange={this.changeOptionSurveyList}>
                                </select>
                                
                                <br/>
                                <textarea id="taTitle" rows="4" cols="50"
                                    onChange={this.changeHandler}/>
                                <br/>
                                <select id="mySelect" onChange={this.changeOption}>
                                    <option value="FourOptionQuestion">Four Option Question</option>
                                    <option value="ThreeOptionQuestion">Three Option Question</option>
                                    <option value="TwoOptionQuestion">Two Option Question</option>
                                    <option value="ShortQuestion">Short Answer Question</option>
                                </select>
                                {bio}

                            </div>
                            <div className="savingForm">
                                <button type="submit">Save</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
        )
    }
}

export default PostForm