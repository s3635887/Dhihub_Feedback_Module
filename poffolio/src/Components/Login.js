import React, {Component} from 'react'
import '../css/login.css'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: ""
      };
    }
  
    validateForm() {
        
        
        // var password
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
        var email = document.getElementById("email")
        var password = document.getElementById("password")
        if(email && password){
            this.setState({email: email.value, password: password.value})
        }
        if(this.state.email === "dhihub@gmail.com" && this.state.password === "dhihub123"){
            window.location.href = "/create_survey";
        }
        else{
            alert("Login Failt!!")
        }
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel className="col span-1-of-3" >Email</ControlLabel>
                    <FormControl className="col span-2-of-3" 
                    autoFocus
                    id="email"
                    // name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                </FormGroup>
            </div>
            <div className="row">
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel className="col span-1-of-3">Password</ControlLabel>
                    <FormControl className="col span-2-of-3"
                    value={this.state.password}
                    onChange={this.handleChange}
                    id="password"
                    // name="password"
                    type="password"
                    />
                </FormGroup>
            </div>
            <div className="row">
                <div className="col span-1-of-3"> </div>
                <Button className="col span-2-of-3"
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                >
                Login
                </Button>
            </div>
            
            
            
          </form>
        </div>
      );
    }
  }
// export default Login  