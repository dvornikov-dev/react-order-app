import { PropsWithChildren } from 'react';
import classes from "./Card.module.css";

const Card: React.FC<PropsWithChildren> = (props) => <div className={classes.card}>{props.children}</div>;

export default Card;
