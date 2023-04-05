import { useState } from 'react'
import { useChatContext } from './useChatContext'

export const useGetChats = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useChatContext()

    const getChats = async (query = {}) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/chat?${Object.keys(query).map(prop => `${prop}=${query[prop]}`).join('&&')}`, {
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
            dispatch({ type: 'GET_CHATS', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { getChats, isLoading, error }
}