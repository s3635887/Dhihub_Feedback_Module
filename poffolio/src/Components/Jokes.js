import React, {Component} from 'react';

class Jokes extends Component {
    state = { joke: {}, jokes: []};

    componentDidMount(){
        fetch('http://127.0.0.1:5000/user')
            .then(response =>  response.json())
            .then(json => this.setState({joke: json}));
    }

    fetchJokes = () => {
        fetch('http://127.0.0.1:5000/user')
            .then(response => response.json())
            .then(json => this.setState({jokes:json}));
    }

    render() {
        const {email, username} = this.state.joke;
        return(
            <div>
                <h2>Hightlighted Joke</h2>
                <p>{email}<em>{username}</em></p>

                <h3>ten more jokes?</h3>
                <button onClick={this.fetchJokes}>Click me</button>
                {
                    this.state.jokes.map(joke1 => {
                        const {id, email, username} = joke1;
                        return <p key={id}>{email}<em>{username}</em></p>
                    })
                }
            </div>
        )
    }
}

export default Jokes