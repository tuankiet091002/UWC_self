import { createContext, useReducer } from "react";


export const ChatContext = createContext();

export const chatReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return { ...state, chats: action.payload }
        case 'CHOOSE_CHAT':
            return { ...state, currChat: action.payload.chat, messages: action.payload.messages }
        case 'CREATE_CHAT':
            return { ...state, chats: [...state.chats, action.payload] }
        case 'SEND_MESSAGE':
            return {
                currChat: action.payload.chat,
                chats: state.chats.map(chat => chat._id === action.payload.chat._id ? action.payload.chat : chat),
                messages: [...state.messages, action.payload.message]
            }
        case 'CREATE_CHAT':
            return {
                ...state,
                chats: [...state.chats, action.payload]
            }
        case 'UPDATE_CHAT':
            return {
                ...state,
                currChat: action.payload,
                chats: state.chats.map((chat) => chat._id === action.payload._id ? action.payload : chat),
            }
        case 'DELETE_CHAT':
            return {
                currChat: null,
                chats: state.chats.filter((chat) => chat._id !== action.payload._id),
                messages: []
            }
        default:
            return state
    }
}

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, { chats: [], messages: [], currChat: null })

    return <ChatContext.Provider value={{ ...state, dispatch }}>{children}</ChatContext.Provider>
}
