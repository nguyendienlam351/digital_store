import { createContext, useReducer,useEffect } from 'react'
import { getData } from '../lib/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initialState = { auth: {} , cart: []}
    const [state, dispatch] = useReducer(reducers, initialState)

    const getUser = async () =>{
        await getData('auth/accessToken').then(res => {
            if(res.err) return localStorage.removeItem("firstLogin")
            
            dispatch({ 
                type: "AUTH",
                payload: {
                    token: res.access_token,
                    user: res.user
                }
            })
        })
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin){
            getUser()
        }
    },[])

    useEffect(() => {
        const local_cart = JSON.parse(localStorage.getItem('local_cart'))

        if(local_cart) dispatch({ type: 'ADD_CART', payload: local_cart })
    }, [])

    useEffect(() => {
        localStorage.setItem('local_cart', JSON.stringify(state.cart))
    }, [state.cart])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}