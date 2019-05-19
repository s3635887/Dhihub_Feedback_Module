import React from 'react'
import {Link} from 'react-router-dom'
import './css/Header.css'

const Header = () => {
    const style = {
        display: 'inline-block',
        margin: 10,
        marginBottom: 30,
        
    };
    return (
        <div>
            <h3 style={style}><Link to="/create_survey">Create Survey</Link></h3>
            <h3 style={style}><Link to="/review_question">Review Questions</Link></h3>
            <h3 style={style}><Link to="/review_survey">Review Survey</Link></h3>
            
        </div>
    )
}

export default Header;