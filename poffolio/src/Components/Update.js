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
    let bio = React.createElement('div', null, null)
    {
        bio =   <div >
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
    return (
        <div className="mainForm">
                {/* {this.props.data.field} */}
                    {/* <div className="logoForm">
                        <img src="/resources/css/img/Logo.gif"/>
                    </div> */}
                    <div className="questionForm">
                        <br/>
                        <h2>Questionnaire</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="savingForm">
                                Question:
                                
                                <br/>
                                <textarea id="taTitle" rows="4" cols="50"
                                    onChange={this.changeHandler}/>
                                <br/>
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