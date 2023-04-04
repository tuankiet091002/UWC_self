import { useState } from 'react'
import { useMCPContext } from './useMCPContext'

export const useDeleteMCP = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useMCPContext()

    const deleteMCP = async (id) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/mcp/${id}`, {
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
            dispatch({ type: 'DELETE_MCP', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { deleteMCP, isLoading, error }
}