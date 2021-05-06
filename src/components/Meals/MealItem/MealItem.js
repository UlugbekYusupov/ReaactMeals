import React, { useContext } from 'react'
import CartContext from '../../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm/MealItemForm'

function MealItem(props) {

    const price = `₩${props.price.toFixed(3)}`
    const cartCtx = useContext(CartContext)

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal}>
            <div style={{display:'flex'}}>
                <img alt="Meal" className={classes.image} />
                <div style={{marginLeft:'20px', paddingTop:'8px'}}>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                </div>
            </div>
            <div><MealItemForm onAddToCart={addToCartHandler} /></div>
        </li>
    )
}

export default MealItem
