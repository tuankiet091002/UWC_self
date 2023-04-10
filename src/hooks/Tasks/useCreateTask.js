import { useState } from 'react'
import { useTaskContext } from './useTaskContext'

export const useCreateTask = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useTaskContext()

    const createTask = async (form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/task`, {
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
            dispatch({ type: 'CREATE_TASK', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { createTask, isLoading, error }
}