import React, { Component } from 'react';
import Jokes from './Components/Jokes'
import PostForm from './Components/PostForm'
import Header from './Header';
class App extends Component {

    constructor(){
        super();
        this.state = { displayBio: false};
    }
    
    render() {
        
                    
        return (
            <div>
                <Header/>
                
                <PostForm/>
                
                <Jokes/>
                <br/><br/><br/>
            </div>
            )
            
        }
        
}



export default App;