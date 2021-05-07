import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../../../../store/auth-context'
import Input from '../../../UI/Input/Item-Input'
import classes from './MealItemForm.module.css'

function MealItemForm(props) {

    const amountInputRef = useRef()
    const [amountIsValid, setAmountIsValid] = useState(true)
    const loginCtx = useContext(AuthContext)

    const submitHandlerForm = (event) => {
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount
        if (enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 || enteredAmountNumber > 5) {
                setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmountNumber)
    }

    return (
        <form className={classes.form} onSubmit={submitHandlerForm}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button disabled={!loginCtx.isLoggedIn}>+ Add</button>
            {!amountIsValid && <p>Please enter a vild number (1~5)</p>}
        </form>
    )
}

export default MealItemForm
