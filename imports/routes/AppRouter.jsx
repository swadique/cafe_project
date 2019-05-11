import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { Tracker } from 'meteor/tracker'

import Home from '../ui/pages/Home'
import Login from '../ui/pages/Login'
import Users from '../ui/pages/Users'
import Register from '../ui/pages/Register';


const history = createHistory();
const unAuthenticatedPages = ['/', '/login','/register']
const authenticatedPages = ['/user']


const NotFoundPage = () => (
    <div>
        Page Not Found! 404!
    </div>
)

const onEnterPublicPage = () => {
    if(Meteor.userId())
        history.replace("/user")
}

const onEnterPrivatePage = () => {
    if(!Meteor.userId())
        history.replace("/")
}

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={Home} onEnter={onEnterPublicPage}></Route>
            <Route path='/login' component={Login} onEnter={onEnterPublicPage}></Route>
            <Route path='/user' component={Users} onEnter={onEnterPrivatePage}></Route>
            <Route path='/register' component={Register} onEnter={onEnterPublicPage}></Route>
            <Route component={NotFoundPage}></Route>
        </Switch>
    </Router>
)

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname)
    const isAuthenticatedPage = authenticatedPages.includes(pathname)

    if(isUnauthenticatedPage && isAuthenticated){
        history.replace("/user")
    }
    else if(isAuthenticatedPage && !isAuthenticated){
        history.replace("/")
    }
})

export default AppRouter