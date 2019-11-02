import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header>
            <svg
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: '#000' }}
            >
                <path d="M 0 2 L 0 4 L 24 4 L 24 2 Z M 0 11 L 0 13 L 24 13 L 24 11 Z M 0 20 L 0 22 L 24 22 L 24 20 Z"></path>
            </svg>
            <h1>
                <Link to="/">My life</Link>
            </h1>

            <ul>
                <li>
                    <a href="#">Messages</a>
                </li>
                <li>
                    <a href="#">Logout</a>
                </li>
            </ul>
        </header>
    );
}

export default Header;
