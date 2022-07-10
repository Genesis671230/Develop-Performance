import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"
import dataReducer from "./dataReducer"

const INITIAL_STATE = {
    currentUser:  JSON.parse(localStorage.getItem("user")) ||  null,
    
}
const INITIAL_DATA = {
    data: JSON.parse(localStorage.getItem("data")) ||  null,
}

export const AuthorizationContext = createContext(INITIAL_STATE)

export const AuthorizationContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [stateData,Datadispatch] = useReducer(dataReducer, INITIAL_DATA);


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.currentUser))
    },[state.currentUser])
    
    
    useEffect(() => {
        localStorage.setItem("data",JSON.stringify(stateData.data))
    }, [stateData.data])

    return (
    <AuthorizationContext.Provider value={{currentUser: state.currentUser,data:stateData.data,Datadispatch ,dispatch}}>
        {children}
    </AuthorizationContext.Provider>
    );
};