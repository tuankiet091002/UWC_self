import { createContext, useReducer, } from "react";


export const TruckContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TRUCKS':
            return { trucks: action.payload }
        case 'CREATE_TRUCK':
            return { trucks: [...state.trucks, action.payload] }
        case 'UPDATE_TRUCK':
            return { trucks: state.trucks.map((truck) => truck._id === action.payload._id ? action.payload : truck) }
        case 'DELETE_TRUCK':
            return { trucks: state.trucks.filter((truck) => truck._id !== action.payload._id) }
        default:
            return state
    }
}

export const TruckContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { trucks: [] })
    
    return <TruckContext.Provider value={{ ...state, dispatch }}>{children}</TruckContext.Provider>
}