import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogIn: (email, password) => {
    },
    onLogOut: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1'); // Item value
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const storedUserLoggedInStatus = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInStatus === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    return (<AuthContext.Provider
        value={{isLoggedIn: isLoggedIn, onLogIn: loginHandler, onLogOut: logoutHandler}}>{props.children}</AuthContext.Provider>)
};

export default AuthContext;