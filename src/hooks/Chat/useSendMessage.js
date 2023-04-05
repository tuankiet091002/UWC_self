import { useState } from 'react'
import { useChatContext } from './useChatContext'

export const useChooseChat = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useChatContext()

    const sendMessage = async (id, form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/mess/chat/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}` },
            body: JSON.stringify(form)
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'SEND_MESSAGE', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { sendMessage, isLoading, error }
}