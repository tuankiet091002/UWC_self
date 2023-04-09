import { useState } from 'react'
import { useTaskContext } from './useTaskContext'

export const useGetTasks = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useTaskContext()

    const getTasks = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/task`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}` },
            body: JSON.stringify()
        })
        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'GET_TASKS', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { getTasks, isLoading, error }
}