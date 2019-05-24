import React, {Component} from 'react';
// import Header from '../Header'

class Jokes extends Component {
    constructor(){
        super()
        
        this.state = { answers:[], questions: [], users:[], surveys:[], SurveyID:"1"};
        this.userID = "";
        this.SurveyID = "";
        this.checkboxOnClick = this.checkboxOnClick.bind(this)
        this.submitOnClick = this.submitOnClick.bind(this)
        this.changeOptionSurveyList = this.changeOptionSurveyList.bind(this)
    }
    
    componentDidMount(){
        fetch('http://127.0.0.1:5000/user/answer/data')
            .then(response => response.json())
            .then(json => this.setState({answers:json}));
        fetch('http://127.0.0.1:5000/user/data')
            .then(response => response.json())
            .then(json => this.setState({questions:json}));
        fetch('http://127.0.0.1:5000/user/info')
            .then(response => response.json())
            .then(json => this.setState({users:json}));
        fetch('http://127.0.0.1:5000/user/survey')
            .then(response => response.json())
            .then(json => this.setState({surveys:json}));
    }

    changeOptionSurveyList(){
        var value = document.getElementById("surveySelect").value
        this.SurveyID = value
        this.setState({SurveyID: value})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    checkboxOnClick = e => {
        for(var i = 0; i < this.state.users.length; i++){
            if(document.getElementById(this.state.users[i].UID).checked === true){
                this.userID = this.state.users[i].UID
                break
            }
        }
    }

    submitOnClick(){

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
                {/* <Header/> */}
                
                <div className="usersForm">
                {
                    this.state.users.map(user => {
                        const {Name, UID} = user
                        let form = <div></div>
                        form =  <div className="userForm">
                                    <input type="radio" name="user" id={UID} value={UID} onClick={this.checkboxOnClick} onChange={this.changeHandler}/>{Name}
                                </div>
                        return(
                            <div key={UID}>
                                {form}
                                <br/>
                            </div>
                        )
                    })
                }
                <button type="submit" onClick={this.submitOnClick}>Submit</button>
                </div>
                <div className="questionForm">
                <h2>Survey review</h2>
                <div className="row col">
                        Survey:
                        <select id="surveySelect" onChange={this.changeOptionSurveyList}>
                            {/* <option value="1">20/May/2019</option>
                            <option value="2">21/May/2019</option>
                            <option value="3">22/May/2019</option> */}
                        </select>
                    </div>
                <div>
                {
                    
                    this.state.questions.map(ques => {
                        const { optionA, optionB, optionC, optionD, que_id, question } = ques;
                        let que = <div></div>
                        let opA = <div></div>
                        let opB = <div></div>
                        let opC = <div></div>
                        let opD = <div></div>
                        let quesList = <div></div>
                        this.state.answers.map(ans => {
                            const {UID, SurveyID, que_id, answer} = ans
                            if(UID === this.userID && SurveyID == this.state.SurveyID){
                                if(ans.que_id === ques.que_id){
                                    que = 
                                            <div className="row">
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
                                    
                                    quesList = 
                                            <div className="row table" key={que_id}>
                                                {que}
                                                {opA}
                                                {opB}
                                                {opC}
                                                {opD}
                                                <p>Answer:{answer}</p>
                                                <br/>
                                                <hr/>
                                            </div>
                                }
                            }
                            
                        })
                        
                        return (
                            <div key={que_id}>
                                {quesList}
                            </div>
                            
                        )
                    })
                }
                </div>
                </div>
            </div>
        )
    }
}

export default Jokes