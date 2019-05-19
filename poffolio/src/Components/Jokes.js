import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header'

class Jokes extends Component {
    constructor(){
        super()
        this.state = { answers:[], questions: []};
    }
    
    componentDidMount(){
        fetch('http://127.0.0.1:5000/user/answer/data')
            .then(response => response.json())
            .then(json => this.setState({answers:json}));
        fetch('http://127.0.0.1:5000/user/data')
            .then(response => response.json())
            .then(json => this.setState({questions:json}));
        
    }

    fetchQuestions = () => {
    }

    render() {
        return(
            <div>
                <Header/>
                <h2>Survey review</h2>
                
                <div>
                {/* <button onClick={this.fetchQuestions}>Click me</button> */}
                {
                    
                    this.state.questions.map(ques => {
                        const { optionA, optionB, optionC, optionD, que_id, question } = ques;
                        let que = <div></div>
                        let opA = <div></div>
                        let opB = <div></div>
                        let opC = <div></div>
                        let opD = <div></div>
                        let quesList = <div></div>
                        let submitForm = <div></div>
                        console.log(ques)
                        this.state.answers.map(ans => {
                            const {UID, SurveyID, que_id, answer} = ans
                            if(ans.que_id == ques.que_id){
                                console.log(ques.question)
                                que = 
                                        <div class="row">
                                            <div class="col span-1-of-1">
                                                <strong>{que_id}. {question}</strong>
                                            </div>
                                        </div>
                                if(optionA != null){
                                    opA = 
                                        <div class="row">
                                            <div class="col span-1-of-10">A:</div>
                                            <div class="col span-2-of-10">{optionA}</div>
                                        </div>
                                }
                                if(optionB != null){
                                    opB = 
                                        <div class="row">
                                            <div class="col span-1-of-10">B:</div>
                                            <div class="col span-2-of-10">{optionB}</div>
                                        </div>
                                }
                                if(optionC != null){
                                    opC = 
                                        <div class="row">
                                            <div class="col span-1-of-10">C:</div>
                                            <div class="col span-2-of-10">{optionC}</div>
                                        </div>
                                }
                                if(optionD != null){
                                    opD = 
                                        <div class="row">
                                            <div class="col span-1-of-10">D:</div>
                                            <div class="col span-2-of-10">{optionD}</div>
                                        </div>
                                }
                                
                                quesList = 
                                        <div class="row table" key={que_id}>
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
                        })
                        
                        return (
                            <div class="questionForm">
                                {quesList}
                            </div>
                            
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default Jokes