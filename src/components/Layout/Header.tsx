import HeaderCartButton from "./HeaderCartButton";
import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header: React.FC<{onShowCart: () => void}> = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="" />
      </div>
    </>
  );
};

export default Header;
