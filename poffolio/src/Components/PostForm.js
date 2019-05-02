import React, {Component} from 'react'
import axios from 'axios'
class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            question:"",
            optionA:"",
            optionB:"",
            optionC:"",
            optionD:"",
            displatBio:false
        }
        this.optionQuestion = this.optionQuestion.bind(this)
        this.non_optionQuestion = this.non_optionQuestion.bind(this)
    }
    
optionQuestion(){
    this.setState({displatBio: true})
}

non_optionQuestion(){
    this.setState({displatBio: false})
}
changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

submitHandler = e => {
    // var data = {userId:'trung',title:'pham', body:'true'}
    // var data = this.state
    e.preventDefault()
    console.log(this.state)
    
    axios.post('http://127.0.0.1:5000/user', this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error =>
            console.log(error)
        )
    }




    render() {
        // const {question, optionA, optionB, optionC} = this.state
        const bio = this.state.displatBio?(
            <div class="questionair">
                <button type="button" onClick={this.non_optionQuestion}>Option</button>
                <br/>
                <br/>
                <div class="text">
                    A:<input type="text" 
                            name="optionA"
                            // value={optionA}
                            onChange={this.changeHandler}
                            />
                </div>
                
                <br/>
                <div class="text">
                    B:<input type="text"
                            name="optionB"
                            // value={optionB}
                            onChange={this.changeHandler}
                            />
                </div>
                <br/>
                <div class="text">
                    C:<input type="text"
                            name="optionC"
                            // value={optionC}
                            onChange={this.changeHandler}
                            />
                </div>
                <br/>
                <div class="text">
                    D:<input type="text"
                            name="optionD"
                            // value={optionC}
                            onChange={this.changeHandler}
                            />
                </div>
                
            </div>
        ):(
            <div>
                <button type="button" onClick={this.optionQuestion}>Option</button>
            </div>
        )
        return (
            <div class="questionair">
                <h2>Questionnaire</h2>
                <form onSubmit={this.submitHandler}>
                    
                    <div>
                        <textarea rows="4" cols="50"
                            name="question"
                            // value={question}
                            onChange={this.changeHandler}/>
                        {bio}

                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm