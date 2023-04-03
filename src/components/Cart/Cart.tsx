import {  useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useSelector, useDispatch } from "react-redux";
import { CartItemModel, CartProps } from './types';
import { IRootState } from '../../store/types';
import { addItem, removeItem } from '../../store'

const Cart: React.FC<CartProps> = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector<IRootState, CartItemModel[]>((state) => state.items);

  const totalAmount = useSelector<IRootState, number>((state) => state.totalAmount);


  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    dispatch(removeItem({id}))
  };

  const cartItemAddHandler = (item: CartItemModel) => {
    dispatch(addItem({
        ...item, amount: 1
      }));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const onOrder = () => {
    setIsCheckout(true);
  };

  const actions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrder}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onCloseCart} />}
      {!isCheckout && actions}
    </Modal>
  );
};

export default Cart;
