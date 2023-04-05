import { createContext, useReducer } from "react";


export const ChatContext = createContext();

export const chatReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return { chats: action.payload }
        case 'CHOOSE_CHAT':
            return { messages: action.payload }
        case 'CREATE_CHAT':
            return { chats: [...state.chats, action.payload] }
        case 'SEND_MESSAGE':
            return {
                chats: !messages.length ? state.chats :
                    state.chats.map(chat => chat._id === messages[0].chat._id ? messages[0].chat : chat),
                messages: [...state.messages, action.payload]
            }
        case 'UPDATE_CHAT':
            return {
                chats: state.chats.map((chat) => chat._id === action.payload._id ? action.payload : chat),
            }
        case 'DELETE_CHAT':
            return {
                chats: state.chats.filter((chat) => chat._id !== action.payload._id),
                currChat: { chat: null, message: [] }
            }
        default:
            return state
    }
}

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, { chats: [], messages: [] })

    return <ChatContext.Provider value={{ ...state, dispatch }}>{children}</ChatContext.Provider>
}