import React from 'react';
import Clock from './clock';
import Dashboard from './dashboard';
import ToDo from './todo';
import Blog from './blog';
import { Switch, Route } from 'react-router-dom';

function Main() {
    return (
        <>
            <Switch>
                <Route path="/clock">
                    <Clock />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/todos">
                    <ToDo />
                </Route>
                <Route path="/blog">
                    <Blog />
                </Route>
            </Switch>
        </>
    );
}

export default Main;
