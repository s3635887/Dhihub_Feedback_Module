import React, { Component } from 'react';
import Projects from './Projects';
import Jokes from './Components/Jokes'
import PostForm from './Components/PostForm'
import JokeSample from './Components/JokeSample';
import Header from './Header';
class App extends Component {

    constructor(){
        super();
        this.state = { displayBio: false};
        this.readMore = this.readMore.bind(this);
        this.readLess = this.readLess.bind(this);
    }
    readMore(){
        this.setState({ displayBio: true});
    }
    readLess(){
        this.setState({ displayBio: false });
    }

    fetchJokes = () => {
        fetch("https://mywebsite.com/endpoint/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                firstname:"trung"
                // lastname:"pham",
            })
        });
    }

    render() {
        const bio = this.state.displayBio? (<div>
                        <p>I live in San Francisco, and code everyday</p>
                        <p>My favorite language is Javascrip and i think ReactJS is awesome </p>
                        <p>Besides coding, i also love music</p>
                        <div>
                            <button onClick={this.readLess}>Read Less</button>
                        </div>
                    </div>) : (
                        <div>
                            <button onClick={this.readMore}>Read More</button>
                        </div>
                    );
                    
        return (
            <div>
                <Header/>
                
                <PostForm/>
                
                <Jokes/>
                <p>my name is trungs. iam a software engineer</p>
                <p>I am always looking forward to working on meanful projects</p>
                {bio}
            </div>
            )
            
        }
        
}

// const element = <h1>Hello, world</h1>


export default App;