import { useState } from 'react'
import { useChatContext } from './useChatContext'

export const useUpdateChat = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useChatContext()

    const updateChat = async (id, form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/chat/${id}`, {
            method: 'PATCH',
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
            dispatch({ type: 'UPDATE_CHAT', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { updateChat, isLoading, error }
}