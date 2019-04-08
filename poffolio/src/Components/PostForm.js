import React, {Component} from 'react'
import axios from 'axios'
class PostForm extends Component {
   constructor(props){
       super(props)
       this.state = {
           username:"",
           email:"",
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
       const { username, email} = this.state
       return (
           <div>
               <form onSubmit={this.submitHandler}>
                   <div>
                       <input type="text"
                           name="username"
                           value={username}
                           onChange={this.changeHandler}/>
                   </div>
                   <div>
                       <input type="text"
                           name="email"
                           value={email}
                           onChange={this.changeHandler}/>
                   </div>
                   {/* <div>
                       <input type="text"
                            name="body"
                            value={body}
                            onChange={this.changeHandler}/>
                   </div> */}
                   <button type="submit">Submit</button>
               </form>
           </div>
       )
   }
}

export default PostForm



