import React, {Component} from 'react'
import axios from 'axios'
// import Header from '../Header'
class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            question:"",
            optionA:"",
            optionB:"",
            optionC:"",
            optionD:"",
            questionType:4
        }
        this.changeOption = this.changeOption.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

changeOption(){
    var value = document.getElementById("mySelect").value
    if(value === "FourOptionQuestion"){
        this.setState({questionType:4})
    }
    if(value === "ThreeOptionQuestion"){
        this.setState({questionType:3})
    }
    if(value === "TwoOptionQuestion"){
        this.setState({questionType:2})
    }
    if(value === "ShortQuestion"){
        this.setState({questionType:1})
    }
    
}

changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

submitHandler = e => {
    var value = document.getElementById("mySelect").value
    var opQ = document.getElementById("taTitle").value
    var opA = ""
    var opB = ""
    var opC = ""
    var opD = ""
    if(value === "FourOptionQuestion"){
        opA = document.getElementById("opA4").value
        opB = document.getElementById("opB4").value
        opC = document.getElementById("opC4").value
        opD = document.getElementById("opD4").value
        if(opQ === "" || opA === "" || opB === "" || opC === "" || opD === ""){
            alert("can not submit empty element!")
        }
        else{
            this.state.question = opQ
            this.state.optionA = opA
            this.state.optionB = opB
            this.state.optionC = opC
            this.state.optionD = opD
            // axios.post('http://127.0.0.1:5000/user', this.state)
            // .then(response => {
            //     console.log(response)
            // })
            // .catch(error =>
            //     console.log(error)
            // )
            fetch('http://127.0.0.1:5000/user', {
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
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
            this.state.question = opQ
            this.state.optionA = opA
            this.state.optionB = opB
            this.state.optionC = opC
            this.state.optionD = null
            axios.post('http://127.0.0.1:5000/user', this.state)
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
            this.state.question = opQ
            this.state.optionA = opA
            this.state.optionB = opB
            this.state.optionC = null
            this.state.optionD = null
            axios.post('http://127.0.0.1:5000/user', this.state)
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
            this.state.question = opQ
            this.state.optionA = null
            this.state.optionB = null
            this.state.optionC = null
            this.state.optionD = null
            // axios.post('http://127.0.0.1:5000/user', this.state)
            // .then(response => {
            //     console.log(response)
            // })
            // .catch(error =>
            //     console.log(error)
            // )

            fetch('http://127.0.0.1:5000/user', {
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })



            document.getElementById("taTitle").value = ""
            alert("Your question is submitted!")
        } 
    }
    e.preventDefault()
    console.log(this.state)
    }

render() {
    let bio = React.createElement('div', null, null)
    if(this.state.questionType === 4){
            
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
        if(this.state.questionType === 3){
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
        if(this.state.questionType === 2){
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
        if(this.state.questionType === 1){
            bio = <div></div>
        }

        return (
                <div className="mainForm">
                    <div className="logoForm">
                        <img src="/resources/css/img/Logo.gif"/>
                    </div>
                    <div className="questionForm">
                        <h2>Questionnaire</h2>
                        <form onSubmit={this.submitHandler}>
                        
                            <div className="savingForm">
                                <textarea id="taTitle" rows="4" cols="50"
                                    // name="question"
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