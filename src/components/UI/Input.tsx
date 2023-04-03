import classes from "./Input.module.css";

interface InputProps {
  label: string;
  input: React.InputHTMLAttributes<HTMLInputElement>
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input type="text" {...props.input} />
    </div>
  );
};

export default Input;
