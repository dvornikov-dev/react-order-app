import { ReactElement, useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { IMealModel } from './types';

const dummyMeals = [
  {
    id: "m1",
    name: "Meal 1",
    description: "Description",
    price: 30.99,
  },
  {
    id: "m2",
    name: "Meal 2",
    description: "Description",
    price: 2.99,
  },
];

const AvailableMeals: React.FC = (): ReactElement<any, any> | null => {
  const [meals, setMeals] = useState<IMealModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // const url = "http://localhost:8000/";

    // async function fetchMeals(url) {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(url);
    //     response.json().then((data) => {
    //       setIsLoading(false);
    //       setMeals(data);
    //     });
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // }

    // fetchMeals(url);

    setMeals(dummyMeals);
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && "Loading..."}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
