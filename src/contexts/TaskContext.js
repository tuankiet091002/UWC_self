import { createContext, useReducer } from "react";


export const TaskContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return { tasks: action.payload }
        case 'CREATE_TASK':
            return { tasks: [...state.tasks, action.payload] }
        case 'CHECK_TASK':
        case 'UPDATE_TASK':
            console.log(action.payload)
            console.log(state.tasks)
            return { tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task) }
        case 'DELETE_TASK':
            return { tasks: state.tasks.filter(task => task._id !== action.payload._id) }
        default:
            return state
    }
}

export const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { tasks: [] })

    return <TaskContext.Provider value={{ ...state, dispatch }}>{children}</TaskContext.Provider>
}