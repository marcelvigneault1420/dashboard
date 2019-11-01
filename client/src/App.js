import React from 'react';
import './App.css';
import Header from './components/header';
import Side from './components/side';
import Main from './components/main';

function App() {
    return (
        <div className="App">
            <Header />
            <Side />
            <Main />
        </div>
    );
}

export default App;
