import React from 'react'
import MealsSummary from './MealsSummary/MealsSummary'
import AvailableMeals from './AvailableMeals/AvailableMeals'
import classes from './Meals.module.css'
import mealsImage from "../../assets/meals.jpg";

function Meals() {
    return (
        <React.Fragment>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A table full of delicious food" />
            </div>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    )
}

export default Meals
