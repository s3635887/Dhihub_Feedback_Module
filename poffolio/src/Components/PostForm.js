import React, {Component} from 'react'
// import axios from 'axios'
class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId:"",
            title:"",
            body:""
        }
    }

changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    // fetch('http://206.189.157.244:8010/test.php', {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/x-www-form-urlencodedn',
    //     }, 
    //     body: JSON.stringify({
    //         firstParam: 'yourValue',
    //         secondParam: 'yourOtherValue',
    //         thirdParam: 'yourOtherValue',
    //       })})
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    }




    render() {
        const { userId, title, body} = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" 
                            name="userId" 
                            value={userId} 
                            onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text" 
                            name="title" 
                            value={title}
                            onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text"
                             name="body"    
                             value={body}
                             onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm