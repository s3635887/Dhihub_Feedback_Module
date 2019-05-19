import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createBrowserHistory from 'history/createBrowserHistory'
import Header from './Header'
import Introduction from './Introduction'
import PostForm from './Components/PostForm'
import Update from './Components/Update'
import QuestionReview from './Components/QuestionReview'
import {Router, Switch, Route} from 'react-router-dom'
import Jokes from './Components/Jokes';
import Login from './Components/Login'

const history = createBrowserHistory()

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Introduction}/>
            <Route path="/create_survey" component={PostForm}/>
            <Route path="/review_survey" component={Jokes}/>
            <Route path="/review_question" component={QuestionReview}/>
            <Route path="/update_question" component={Update}/>
            <Route path="/login" component={Login}/>
        </Switch>
    </Router>, 
    document.getElementById('root'));


