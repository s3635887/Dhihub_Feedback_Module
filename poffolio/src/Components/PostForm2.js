import React, {Component} from 'react'

class PostForm2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname:'',
            lastname:''
        }
    }

    changeHandle = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandle = e => {
        var data = {firstname:'Trung',lastname:'Pham'}
        e.preventDefault()
        console.log(this.state)
        fetch('https://www.w3schools.com/action_page.php', {
            method:'POST',
            async:true,
            crossDomain:true,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(data)
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const{firstname, lastname} = this.state
        return(
            <div>
                <form onSubmit={this.submitHandle}>
                    <div>
                        <input type="text"
                            name="firstname"
                            value={firstname}
                            onChange={this.changeHandle}/>
                    </div>
                    <div>
                        <input type="text"
                            name="lastname"
                            value={lastname}
                            onChange={this.changeHandle}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                
            </div>
        )
    }
}

export default PostForm2