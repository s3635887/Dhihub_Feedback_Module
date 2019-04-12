import React, {Component} from 'react'
import axios from 'axios'
class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            question:""
        }
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
        const {question} = this.state
        // const { name, email} = this.state
        // const {name}
        // this.setState({isComplete:true})
        return (
            <div class="questionair">
                <h2>Questionairs</h2>
                <form onSubmit={this.submitHandler}>
                    {/* <div>
                        <input type="text" 
                            name="Id" 
                            value={Id} 
                            onChange={this.changeHandler}/>
                    </div> */}
                    {/* <div>
                        <input type="text" 
                            name="name" 
                            value={name}
                            onChange={this.changeHandler}/>
                    </div> */}
                    <div>
                        <textarea rows="4" cols="50"
                            name="question"
                            //value={question}
                            onChange={this.changeHandler}/>
                    </div>
                    {/* <div>
                        <input type="text"
                             name="email"    
                             value={email}
                             onChange={this.changeHandler}/>
                    </div> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm