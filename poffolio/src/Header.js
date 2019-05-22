import React from 'react'
import {Link} from 'react-router-dom'
import './css/Header.css'

const Header = ({children}) => {
    const style = {
        display: 'inline-block',
        margin: 10,
        marginBottom: 30,
        color:'red',
    };
    var style2 = {
        float: 'right'
    }
    var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
    };
    return (
        <div className="mainHeader">
            <h3 style={style}><Link to="/create_survey">Add Question</Link></h3>
            <h3 style={style}><Link to="/review_question">Review Survey</Link></h3>
            <h3 style={style}><Link to="/review_survey">Review Answer</Link></h3>
            <div style={Object.assign({backgroundColor: bgColors.Blue}, style, style2)} >
                <input type="text"></input>
                <button type="submit">New Survey</button>
            </div>
            {children}
        </div>
    )
}

export default Header;