import { createContext, useReducer } from "react";

export const NotificationContext = createContext();

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
        case 'READ_ALL_NOTIFICATIONS':
            return { notifications: action.payload }
        case 'READ_NOTIFICATION':
            return { notifications: state.notifications.map((noti) => noti._id === action.payload._id ? action.payload : noti) }
        default:
            return state
    }
}

export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, { notifications: [] })

    return <NotificationContext.Provider value={{ ...state, dispatch }}>{children}</NotificationContext.Provider>
}