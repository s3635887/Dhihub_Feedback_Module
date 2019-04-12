import React, {Component} from 'react';
import axios from 'axios';

class Jokes extends Component {
    constructor(){
        super()
        this.state = { joke: {}, jokes: []};
    }
    

    componentDidMount(){
        // fetch('https://localhost:5001/api/Todo/1')
        //     .then(response =>  response.json())
        //     .then(json => this.setState({joke: json}));
            
    }

    fetchJokes = () => {
        // axios.get('https://localhost:5001/api/Todo')
        //     .then(function(response){
        //         console.log(response);
        //         this.setState({jokes:response.json()})
        //     })
        //     .then(function(error){
        //         console.log(error)
        //     })
        fetch('http://127.0.0.1:5000/user')
            .then(response => response.json())
            .then(json => this.setState({jokes:json}));
    }

    render() {
        const {id,question} = this.state.joke;
        return(
            <div>
                <h2>Survey review</h2>
                
                <button onClick={this.fetchJokes}>Click me</button>
                {
                    this.state.jokes.map(joky => {
                        const {id, question} = joky;
                        return (
                            <div class="row table" key={id} >
                                <div class="row">
                                    <div class="col span-1-of-3">
                                        <p>{id}. {question}</p>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }
}

export default Jokes