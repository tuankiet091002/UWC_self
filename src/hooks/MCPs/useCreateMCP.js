import { useState } from 'react'
import { useMCPContext } from './useMCPContext'

export const useCreateMCP = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useMCPContext()

    const createMCP = async (form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/mcp', {
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
            dispatch({ type: 'CREATE_MCP', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { createMCP, isLoading, error }
}