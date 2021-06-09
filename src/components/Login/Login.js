import React, {useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailDispatcher = (prevState, action) => {
  if (action.type === "USER_INPUT"){
      return {value: action.value, isValid: true};
  }

  if (action.type === "INPUT_BLUR"){
      return {value: prevState.value, isValid: prevState.value.includes('@')};
  }

  return {value: '', isValid: false};
};

const Login = (props) => {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();


    const [emailStatus, setEmailStatus] = useReducer(emailDispatcher, {value: '', isValid: null});

    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         console.log("Checking for validity!");
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().trim().length > 6
    //         );
    //     }, 500);
    //
    //     // clean up function
    //     return () => {
    //         console.log("Cleanup");
    //         clearTimeout(identifier);
    //     };
    // }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        setEmailStatus({type: "USER_INPUT", value: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const validateEmailHandler = () => {
        setEmailStatus({type: "INPUT_BLUR"});
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailStatus.value, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailStatus.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailStatus.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!emailStatus.isValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
