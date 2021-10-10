import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import AuthContext from "../store/auth-context";
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../Input/Input';
import classes from './Login.module.css';

const emailDispatcher = (prevState, action) => {
    if (action.type === "USER_INPUT") {
        return {value: action.value, isValid: action.value.includes('@')};
    }

    if (action.type === "INPUT_BLUR") {
        return {value: prevState.value, isValid: prevState.value.includes('@')};
    }

    return {value: '', isValid: false};
};

const passwordDispatcher = (prevState, action) => {
    if (action.type === "USER_INPUT") {
        return {value: action.value, isValid: action.value.trim().length > 6};
    }

    if (action.type === "INPUT_BLUR") {
        return {value: prevState.value, isValid: prevState.value.trim().length > 6};
    }

    return {value: '', isValid: false};
};

const Login = () => {
    const [emailStatus, setEmailStatus] = useReducer(emailDispatcher, {value: '', isValid: null});
    const [passwordStatus, setPasswordStatus] = useReducer(passwordDispatcher, {value: '', isValid: null});
    const [formIsValid, setFormIsValid] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const {isValid: emailValidity} = emailStatus;
    const {isValid: passwordValidity} = passwordStatus;

    const authContextContent = useContext(AuthContext);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("Checking for validity!");
            setFormIsValid(
                emailValidity && passwordValidity
            );
        }, 500);

        // clean up function
        return () => {
            console.log("Cleanup");
            clearTimeout(identifier);
        };
    }, [emailValidity, passwordValidity]);

    const emailChangeHandler = (event) => {
        setEmailStatus({type: "USER_INPUT", value: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        setPasswordStatus({type: 'USER_INPUT', value: event.target.value,});
    };

    const validateEmailHandler = () => {
        setEmailStatus({type: "INPUT_BLUR"});
    };

    const validatePasswordHandler = () => {
        setPasswordStatus({type: "INPUT_BLUR"});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(emailStatus);
        if (formIsValid) {
            authContextContent.onLogIn(emailStatus.value, passwordStatus.value);
        } else if (!emailStatus.value) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input ref={emailInputRef} isValid={emailValidity} id="email" type="email" label="Email"
                       value={emailStatus.value} onChange={emailChangeHandler}
                       onBlur={validateEmailHandler}/>
                <Input ref={passwordInputRef} isValid={passwordValidity} id="password" type="password" label="Password"
                       value={passwordStatus.value}
                       onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
