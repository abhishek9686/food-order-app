import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";
import Input from "../../UI/Input";
const MealItemForm = (props) => {
  const [amtIsValid, setAmtIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmtIsValid(false);
      return;
    }
    console.log("AMOUNT: ", enteredAmount);
    props.onAddToCart(enteredAmountNum);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amtIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};
export default MealItemForm;
