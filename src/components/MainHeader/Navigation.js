import React, {useContext} from 'react';

import classes from './Navigation.module.css';
import authContext from "../store/auth-context";

const Navigation = () => {
    const authContextContent = useContext(authContext);
    return (
        <nav className={classes.nav}>
            <ul>
                {authContextContent.isLoggedIn && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {authContextContent.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {authContextContent.isLoggedIn && (
                    <li>
                        <button onClick={authContextContent.onLogOut}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
