import { createContext, useReducer } from "react";


export const EmpContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EMPS':
            return { emps: action.payload }
        default:
            return state
    }
}

export const EmpContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { emps: [] })

    return <EmpContext.Provider value={{ ...state, dispatch }}>{children}</EmpContext.Provider>
}