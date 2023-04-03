import { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useSelector } from "react-redux";
import { CartItemModel } from '../Cart/types';
import { IRootState } from '../../store/types';

const HeaderCartButton: React.FC<{onClick: () => void}> = (props) => {
  const [buttonIsHl, setButtonIsHl] = useState(false);
  const items = useSelector<IRootState, CartItemModel[]>((state) => state.items);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHl(true);
    const timer = setTimeout(() => {
      setButtonIsHl(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items, items.length]);

  const btnClasses = `${classes.button} ${buttonIsHl ? classes.bump : ""}`;
  const numberOfCartItems = items.reduce((curNumber: number, item: CartItemModel) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
