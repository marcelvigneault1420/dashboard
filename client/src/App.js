import React from 'react';
import './App.css';
import Header from './components/header';
import Side from './components/side';
import Main from './components/main';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Side />
                <Main />
            </Router>
        </div>
    );
}

export default App;
