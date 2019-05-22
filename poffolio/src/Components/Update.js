import React, {Component} from 'react'
class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            question:"How do you think about the lecture today?",
            optionA:"very good",
            optionB:"good",
            optionC:"so so",
            optionD:"bad",
            questionType:4
        }
        this.updateOnClick = this.updateOnClick.bind(this)
    }

updateOnClick(){
    alert("Update successful!!!!!")
}

changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

submitHandler = e => {
    
}


render() {
    const {question, optionA, optionB, optionC, optionD} = this.state
    return (
            <div classname="questionair">
                <form onSubmit={this.submitHandler}>
                <h2>Questionnaire</h2>
                    <div>
                        <textarea id="taTitle" rows="4" cols="50"
                            name="question"
                            value={question}
                            onChange={this.changeHandler}/>
                        <br/>
                        <br/>
                        <br/>
                        <div classname="text">
                            A:<input id="opA4" type="text" 
                                    name="optionA"
                                    value={optionA}
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div classname="text">
                            B:<input id="opB4" type="text"
                                    name="optionB"
                                    value={optionB}
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div classname="text">
                            C:<input id="opC4" type="text"
                                    name="optionC"
                                    value={optionC}
                                    onChange={this.changeHandler}
                                    />
                        </div>
                        <br/>
                        <div classname="text">
                            D:<input id="opD4" type="text"
                                    // name="optionD"
                                    value={optionD}
                                    onChange={this.changeHandler}
                                    />
                        </div>

                    </div>
                    <button type="submit" onClick={this.updateOnClick}>Update</button>
                </form>
            </div>
        )
    }
}

export default PostForm