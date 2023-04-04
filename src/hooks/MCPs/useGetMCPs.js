import { useState } from 'react'
import { useMCPContext } from './useMCPContext'

export const useGetMCPs = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useMCPContext()

    const getMCPs = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/mcp', {
            method: 'GET',
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
            dispatch({ type: 'GET_MCPS', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { getMCPs, isLoading, error }
}