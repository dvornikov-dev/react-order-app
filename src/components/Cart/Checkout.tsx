import { useState } from "react";
import Input from "../UI/Input";
import classes from "./Checkout.module.css";

interface IForm {
  name: string;
  address: string;
}

const isNotEmpty = (value: any) => {
  return value !== undefined && value !== null && value !== "";
};

const sendForm = (form: IForm) => {
  fetch("http://localhost:8000/", {
    method: "POST",
    body: JSON.stringify(form),
  });
};

const Checkout: React.FC<{onCancel: () => void}> = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [formInputs, setFormInputs] = useState({
    name: true,
    address: true,
  });
  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameValid = isNotEmpty(name);
    const isAddressValid = isNotEmpty(address);

    setFormInputs({
      name: isNameValid,
      address: isAddressValid,
    });

    let isFormValid = isAddressValid && isNameValid;

    if (isFormValid) {
      sendForm({ name, address });
    }
  };
  return (
    <form onSubmit={onConfirm} className={classes.form}>
      <Input
        label="Full Name"
        input={{
          id: "name",
          type: "text",
          onChange: nameChangeHandler,
          className: classes.control,
        }}
      />
      {!formInputs.name && <p>Name is not valid</p>}
      <Input
        label="Address"
        input={{
          id: "address",
          type: "text",
          onChange: addressChangeHandler,
          className: classes.control,
        }}
      />
      {!formInputs.address && <p>Address is not valid</p>}

      <div className={classes.actions}>
        <button onClick={props.onCancel}>Cancel</button>

        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
