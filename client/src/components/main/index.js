import React from 'react';
import Clock from './clock';
import Dashboard from './dashboard';
import ToDo from './todo';
import Blog from './blog';

function Main() {
    return (
        <div>
            <Clock />
            <Dashboard />
            <ToDo />
            <Blog />
        </div>
    );
}

export default Main;
