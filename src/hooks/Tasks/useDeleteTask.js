import { useState } from 'react'
import { useTaskContext } from './useTaskContext'

export const useDeleteTask = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useTaskContext()

    const deleteTask = async (id) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/task/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}`},
            body: JSON.stringify()
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'DELETE_TASK', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { deleteTask, isLoading, error }
}