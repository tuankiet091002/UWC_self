import { useState } from 'react'
import { useChatContext } from './useChatContext'

export const useSendMessage = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useChatContext()

    const sendMessage = async (chat, content) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/mess/chat/${chat._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}` },
            body: JSON.stringify({ content })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'SEND_MESSAGE', payload: {chat: {...chat, lastestMessage: json.result}, message: json.result} })
            // update loading state
            setIsLoading(false)
        }
    }

    return { sendMessage, isLoading, error }
}