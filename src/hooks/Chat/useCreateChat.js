import { useState } from 'react'
import { useChatContext } from './useChatContext'

export const useCreateChat = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useChatContext()

    const createChat = async (form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/chat`, {
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
            // create the auth context
            dispatch({ type: 'CREATE_CHAT', payload: json.result })
            // create loading state
            setIsLoading(false)
        }
    }

    return { createChat, isLoading, error }
}