import React, {Component} from 'react';
import axios from 'axios';

class Jokes extends Component {
    constructor(){
        super()
        this.state = { questions: []};
    }
    
    componentDidMount(){
    }

    fetchQuestions = () => {
        fetch('http://127.0.0.1:5000/user/data')
            .then(response => response.json())
            .then(json => this.setState({questions:json}));
    }

    render() {
        let options =  
                    <div>
                        
                    </div>
        return(
            <div>
                <h2>Survey review</h2>
                
                <button onClick={this.fetchQuestions}>Click me</button>
                {
                    this.state.questions.map(ques => {
                        const { optionA, optionB, optionC, optionD, que_id, question } = ques;
                        let opA = <div></div>
                        let opB = <div></div>
                        let opC = <div></div>
                        let opD = <div></div>
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
                        return (
                            <div class="row table" key={que_id} >
                                <div class="row">
                                    <div class="col span-1-of-1">
                                        <strong>{que_id}. {question}</strong>
                                    </div>
                                </div>
                                {opA}
                                {opB}
                                {opC}
                                {opD}
                                <p>Answer:</p>
                                <br/>
                                <hr/>
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }
}

export default Jokes