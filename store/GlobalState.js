import { createContext, useReducer,useEffect } from 'react'
import { getData } from '../lib/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initialState = { auth: {} }
    const [state, dispatch] = useReducer(reducers, initialState)

    const getUser = async () =>{
        await getData('auth/accessToken').then(res => {
            if(res.err) return localStorage.removeItem("firstLogin")
            
            console.log(res.user)
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

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}