import { useState } from 'react'
import { useTruckContext } from './useTruckContext'

export const useDeleteTruck = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useTruckContext()

    const deleteTruck = async (id) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/truck/${id}`, {
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
            dispatch({ type: 'DELETE_TRUCK', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { deleteTruck, isLoading, error }
}