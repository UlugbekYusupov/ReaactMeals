import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../../Carts/CartIcon'
import CartContext from '../../../store/cart-context'

function HeaderCartButton(props) {

    // using custom CartContext
    const cartCtx = useContext(CartContext)
    
    const [btnIsHighlaighted, setBtnIsHighlaighted] = useState(false)
    const { items } = cartCtx

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHighlaighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlaighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlaighted(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton