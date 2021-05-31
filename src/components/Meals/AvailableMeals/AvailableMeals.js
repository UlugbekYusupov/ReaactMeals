import classes from './AvailableMeals.module.css'
import Card from '../../UI/Card/Card'
import MealItem from '../MealItem/MealItem';

import { useEffect, useState } from 'react'



import Shashlik from '../../../assets/shashlik.jpeg'
import Qoturma from '../../../assets/qoturma.jpeg'
import Palov from '../../../assets/palov.jpeg'
import Somsa from '../../../assets/somsa.jpeg'
import Non from '../../../assets/non.jpeg'

export const foodImgs = [
    Somsa, Palov, Qoturma, Non, Shashlik
];


const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://reactmeals-b0304-default-rtdb.firebaseio.com/meals.json')
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }

            const responseData = await response.json()
            const loadedMeals = []
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchMeals().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })

    }, [])

    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map((meal, index) =>
        <MealItem
            key={meal.id}
            name={meal.name}
            id={meal.id}
            description={meal.description}
            price={meal.price}
            image={foodImgs[index]}
        />
    )

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
