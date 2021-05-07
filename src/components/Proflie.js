import React, { useContext, useEffect } from 'react'
import AuthContext from '../store/auth-context'

function Proflie() {
    const loginCtx = useContext(AuthContext)

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (loginCtx.isLoggedIn) {
                const response = await fetch('https://food-order-38f3a-default-rtdb.firebaseio.com/users.json')
                if (!response.ok) {
                    throw new Error("Something went wrong!")
                }
                const responseData = await response.json()

                for(const user in responseData) {
                    if(responseData[user].token === loginCtx.token){
                        console.log(user)
                    }
                }
            }

            // const loadedMeals = []
            // for (const key in responseData) {
            //     loadedMeals.push({
            //         id: key,
            //         name: responseData[key].name,
            //         description: responseData[key].description,
            //         price: responseData[key].price
            //     })
            // }
            // setMeals(loadedMeals)
            // setIsLoading(false)
        }

        fetchUserInfo().catch(error => {
            // setIsLoading(false)
            // setHttpError(error.message)
        })
    }, [])


    return (
        <div>
            <h1>Hello it is Proflie</h1>
        </div>
    )
}

export default Proflie