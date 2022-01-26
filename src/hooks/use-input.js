import react from 'react-dom';
import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const onBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    valueIsValid,
    inputChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
