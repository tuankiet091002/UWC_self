import { useState } from 'react'
import { useTaskContext } from './useTaskContext'

export const useCheckTask = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useTaskContext()

    const checkTask = async (id) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/task/${id}`, {
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
            dispatch({ type: 'CHECK_TASK', payload: json.result })
            setError(json.message)
            // update loading state
            setIsLoading(false)
        }
    }

    return { checkTask, isLoading, error }
}