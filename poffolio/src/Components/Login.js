import React, {Component} from 'react'
import '../css/login.css'
class Login extends Component {
    constructor(){
        super();
        this.setState({username: "", password:"", status: false});
        this.login = this.login.bind(this)
    }

    login(){
        var username = document.getElementById("username").value
        var password = document.getElementById("password").value
        console.log(username)
        console.log(password)
        // if(username == "dhihub" && password == "dhihub123"){
        //     this.state.status = true
        // }
        // else
        //     this.state.status = false
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        // {
        //     if(this.state.status == true){

        //     }
        //     else{

        //     }
        // }
        return (
            <div>
                <form>
                    Username: <input id="username" type="text" name="username" onChange={this.changeHandler}/>
                    <br/>
                    Password: <input id="password" type="text" name="password" onChange={this.changeHandler}/>
                    <br/>
                    <button type="submit" onClick={this.login}>Login</button>
                    <button><a href="/">Cancel</a></button>
                </form>
            </div>
        )
    }
    
}

export default Login;