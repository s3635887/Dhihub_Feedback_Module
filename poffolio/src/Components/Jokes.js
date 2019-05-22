import React, {Component} from 'react';
// import Header from '../Header'

class Jokes extends Component {
    constructor(){
        super()
        
        this.state = { answers:[], questions: [], users:[], userID:""};
        this.checkboxOnClick = this.checkboxOnClick.bind(this)
        this.submitOnClick = this.submitOnClick.bind(this)
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
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    checkboxOnClick = e => {
        for(var i = 0; i < this.state.users.length; i++){
            if(document.getElementById(this.state.users[i].UID).checked === true){
                this.state.userID = this.state.users[i].UID
                break
            }
        }
    }

    submitOnClick(){

    }

    render() {
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
                            if(UID === this.state.userID){
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