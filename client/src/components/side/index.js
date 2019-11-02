import React from 'react';
import { NavLink } from 'react-router-dom';
function Side() {
    return (
        <aside>
            <div className="user-aside">
                <img width="50px" height="50px" alt="user"></img>
                <div className="userinfo">
                    <h2>Your name</h2>
                    <p>Welcome back</p>
                </div>
            </div>

            <nav>
                <ul>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/clock">Clock</NavLink>
                    </li>
                    <li>
                        <NavLink to="/todos">ToDos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog">Blog</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Side;
