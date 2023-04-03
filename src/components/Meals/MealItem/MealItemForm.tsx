import { FormEvent, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm: React.FC<{id: string, onAddToCart: (amount: number) => void}> = (props) => {
  const [amountValue, setAmountValue] = useState<string>('0');
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredAmount = +amountValue;
    if (enteredAmount > 5 || enteredAmount < 1) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmount);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          value: amountValue,
          onChange: changeHandler,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
