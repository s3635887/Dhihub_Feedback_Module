import React, { Component } from 'react';

class JokeSample extends Component {
    state = {joke:{}};
    
    componentDidMount(){
        const url = 'http://206.189.157.244:8010/test.php';
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({joke:json}))
            .catch(() => console.log("Cant access " + url + " response!"));
    }

    render(){
        const{message} = this.state.joke;
        return(
            <div>
                <h2>Hightlighted</h2>
                <p>{message}</p>
            </div>
        )
    }
}

export default JokeSample;