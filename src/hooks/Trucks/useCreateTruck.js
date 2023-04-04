import { useState } from 'react'
import { useTruckContext } from './useTruckContext'

export const useCreateTruck = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useTruckContext()

    const createTruck = async (form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/truck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}`},
            body: JSON.stringify(form)
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'CREATE_TRUCK', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { createTruck, isLoading, error }
}