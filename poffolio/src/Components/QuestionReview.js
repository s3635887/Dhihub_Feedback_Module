import React, {Component} from 'react';
import Header from '../Header'
import axios from 'axios';

class QuestionReview extends Component {
    constructor(){
        super()
        this.state = {questions: [], users:[], subUsers:[]};
        this.deleteOnClick = this.deleteOnClick.bind(this)
        this.updateOnClick = this.updateOnClick.bind(this)
        this.checkboxOnClick = this.checkboxOnClick.bind(this)
        this.submitOnClick = this.submitOnClick.bind(this)
        // this.showmore = this.showmore.bind(this);
    }
    
    componentDidMount(){
        fetch('http://127.0.0.1:5000/user/data')
            .then(response => response.json())
            .then(json => this.setState({questions:json}));

        fetch('http://127.0.0.1:5000/user/info')
            .then(response => response.json())
            .then(json => this.setState({users:json}));
    }

    fetchQuestions = () => {
    }

    updateOnClick(){

    }
    deleteOnClick(){
        alert("The Question is deleted!!!!")
    }
    checkboxOnClick(){
        
        // console.log(user)
    }
    submitOnClick(){
        var userCheck = []


        let data = {questions:[], subUsers:[]}
        data.question = this.state.questions


        // let data = {question:{}, subUsers:[]}
        // data.question = this.state.questions[this.state.questions.length - 1]
        for (var i = 0 ; i < this.state.users.length; i++){
            userCheck[i] = document.getElementById(this.state.users[i].UID)
        }
        for (var i = 0 ; i < this.state.users.length; i++){
            if(userCheck[i].checked == true){
                data.subUsers.push(this.state.users[i].UID)
            }
        }
        console.log(data)
        axios.post('http://127.0.0.1:5000/user/submit', data)
            .then(response => {
                console.log(response)
            })
            .catch(error =>
                console.log(error)
            )
    }

    render() {
        return(
            <div>
                <Header/>
                <h2>Questions review</h2>
                {/* <div class="submitForm">
                    <input type="checkbox" id="trung"/>Trung<br/>
                    <input type="checkbox" id="Pavan"/>Pavan<br/>
                    <input type="checkbox" id="Rana"/>Rana<br/>
                    <input type="checkbox" id="Richa"/>Richa<br/>
                    <input type="checkbox" id="Christina"/>Christina<br/>
                    <input type="checkbox" id="Yuri"/>Yuri<br/>
                    <button type="button">Submit</button>
                </div> */}
                <div className="submitForm">
                {
                    this.state.users.map(user => {
                        const {Name, UID} = user
                        let form = <div></div>
                        form = 
                                <div>
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
                <button type="submit" onClick={this.submitOnClick}>Submit</button>
                </div>
                {
                    this.state.questions.map(ques => {
                        const { optionA, optionB, optionC, optionD, que_id, question } = ques;
                        let que = <div></div>
                        let opA = <div></div>
                        let opB = <div></div>
                        let opC = <div></div>
                        let opD = <div></div>
                        let form = <div></div>
                        que =   <div className="row">
                                    <div className="col span-1-of-1">
                                        <strong>{que_id}. {question}</strong>
                                            <a href="/update_question" onClick={this.updateOnClick}>Update</a>| 
                                            <a href="#" onClick={this.deleteOnClick}>Delete</a>
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
                                        <div className="row table" key={que_id} >
                                            {que}
                                            {opA}
                                            {opB}
                                            {opC}
                                            {opD}
                                            <br/>
                                            <hr/>
                                        </div>
                           
                        return (
                            <div key={que_id}>
                                {form}
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }
}

export default QuestionReview