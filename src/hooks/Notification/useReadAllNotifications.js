import { useState } from 'react'
import { useNotificationContext } from './useNotificationContext'

export const useReadAllNotifications = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useNotificationContext()

    const readAllNotifications = async (user = '') => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/noti?user=${user}`, {
            method: 'POST',
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
            dispatch({ type: 'READ_ALL_NOTIFICATIONS', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { readAllNotifications, isLoading, error }
}