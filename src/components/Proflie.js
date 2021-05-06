import React, { useEffect } from 'react'

function Proflie() {

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch('https://food-order-38f3a-default-rtdb.firebaseio.com')
           
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

        fetchUserInfo().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])


    return (
        <div>
            <h1>Hello it is Proflie</h1>
        </div>
    )
}

export default Proflie