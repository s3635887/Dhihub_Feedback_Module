import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import Introduction from './Introduction'
import PostForm from './Components/PostForm'
import Update from './Components/Update'
import QuestionReview from './Components/QuestionReview'
import {Router, Switch, Route} from 'react-router-dom'
import Jokes from './Components/Jokes';
import Login from './Components/Login'
import Header from './Header'

const history = createBrowserHistory()

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Introduction}/>
            <Route path="/create_survey" render={() => <Header><PostForm/></Header>}/>
            <Route path="/review_survey" render={() => <Header><Jokes/></Header>}/>
            <Route path="/review_question" render={() => <Header><QuestionReview/></Header>}/>
            <Route path="/update_question" render={() => <Header><Update/></Header>}/>
            <Route path="/login" component={Login}/>
        </Switch>
    </Router>, 
    document.getElementById('root'));


