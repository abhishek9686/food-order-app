import react from 'react-dom';
import { useState } from 'react';
import useInput from '../../hooks/use-input';
import classes from './Login.module.css';

const Login = (props) => {
  let formIsValid = false;
  const {
    value: enteredName,
    hasError: nameHasError,
    valueIsValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== '');
  const {
    value: enteredMail,
    hasError: mailHasError,
    valueIsValid: mailIsValid,
    inputChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes('@'));
  const {
    value: enteredNum,
    hasError: phoneHasError,
    valueIsValid: phoneIsValid,
    inputChangeHandler: phoneChangeHandler,
    onBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput((value) => value.toString().length === 10);

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valueIsValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    reset: resetPassWord,
  } = useInput((value) => value.toString().length >= 8);
  if (nameIsValid && mailIsValid && passwordIsValid && phoneIsValid) {
    formIsValid = true;
  }
  const nameInputClass = nameHasError ? 'input-box-invalid' : 'input-box';
  const mailInputClass = mailHasError ? 'input-box-invalid' : 'input-box';
  const passwordInputClass = passwordHasError
    ? 'input-box-invalid'
    : 'input-box';
  const numInputClass = phoneHasError ? 'input-box-invalid' : 'input-box';
  const skipHandler = () => {
    props.skipLoginHandler(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    resetName();
    resetEmail();
    resetPhone();
    resetPassWord();
    props.loginHandler(true);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={classes['form-box']}>
        <div className={classes[nameInputClass]}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
          {nameHasError && <p>Invalid Name!!</p>}
        </div>
        <div className={classes[mailInputClass]}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            value={enteredMail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
          {mailHasError && <p>E-Mail is Invalid</p>}
        </div>
        <div className={classes[numInputClass]}>
          <label htmlFor='number'>Mobile Number</label>
          <input
            type='text'
            value={enteredNum}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          ></input>
          {phoneHasError && <p>Number is invalid!!</p>}
        </div>
        <div className={classes[passwordInputClass]}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          ></input>
          {passwordHasError && <p>Password is Invalid!!</p>}
        </div>
        <button disabled={!formIsValid}>Submit</button>
        <div>
          <button type='button' onClick={skipHandler}>
            Skip for Now {`->`}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
