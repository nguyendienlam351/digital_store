import { createContext, useReducer,useEffect } from 'react'
import { getData } from '../lib/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initialState = {notify: {}, cart: []}
    const [state, dispatch] = useReducer(reducers, initialState)

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