import { useState } from 'react'
import { useNotificationContext } from './useNotificationContext'

export const useGetNotifications = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useNotificationContext()

    const getNotifications = async (user = '') => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/noti?user=${user}`, {
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
            dispatch({ type: 'GET_NOTIFICATIONS', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { getNotifications, isLoading, error }
}