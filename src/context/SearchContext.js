import { createContext, useReducer } from "react"
import SearchReducer from "./SearchReducer"

const INITIAL_STATE = {
    insert: ''
}

export const SearchContext = createContext(INITIAL_STATE)

export const SearchContextProvider = ({children})=>{
    const [state,searchDispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
    <SearchContext.Provider value={{insert: state.insert,searchDispatch}}>
        {children}
    </SearchContext.Provider>
    );
};