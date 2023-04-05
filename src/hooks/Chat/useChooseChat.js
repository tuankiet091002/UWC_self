import { useState } from 'react'
import { useChatContext } from './useChatContext'

export const useChooseChat = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useChatContext()

    const chooseChat = async (chat) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/mess/chat/${chat._id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}` },
            body: JSON.stringify()
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'CHOOSE_CHAT', payload: { chat: chat, messages: json.result } })
            // update loading state
            setIsLoading(false)
        }
    }

    return { chooseChat, isLoading, error }
}