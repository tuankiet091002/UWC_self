import { useState } from 'react'
import { useEmpContext } from './useEmpContext'

export const useGetEmps = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useEmpContext()

    const getEmps = async (query = {}) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/user?${Object.keys(query).map(prop => `${prop}=${query[prop]}`).join('&&')}`, {
            method: 'GET',
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
            dispatch({ type: 'GET_EMPS', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { getEmps, isLoading, error }
}