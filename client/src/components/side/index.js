import React from 'react';

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
                        <button>Dashboard</button>
                    </li>
                    <li>
                        <button>Clock</button>
                    </li>
                    <li>
                        <button>ToDos</button>
                    </li>
                    <li>
                        <button>Blog</button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Side;
