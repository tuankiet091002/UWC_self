import { createContext, useReducer } from "react";

export const MCPContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MCPS':
            return { mcps: action.payload }
        case 'CREATE_MCPS':
            return { mcps: [...state.mcps, action.payload] }
        case 'UPDATE_TRUCK':
            return { mcps: state.mcps.map((mcp) => mcp._id === action.payload._id ? action.payload : mcp) }
        case 'DELETE_TRUCK':
            return { mcps: state.mcps.filter((mcp) => mcp._id !== action.payload._id) }
        default:
            return state
    }
}

export const MCPContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { mcps: [] })

    return <MCPContext.Provider value={{ ...state, dispatch }}>{children}</MCPContext.Provider>
}