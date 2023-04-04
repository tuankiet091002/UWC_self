import React, { useEffect } from 'react'

import { useEmpContext } from '../hooks/Emps/useEmpContext'
import { useGetEmps } from '../hooks/Emps/useGetEmps'

const Employee = () => {
    const { emps } = useEmpContext()
    const { getEmps, isLoading, error } = useGetEmps()

    useEffect(() => {
        getEmps()
    }, [])


    return (<>
        {error ? error.message : null}
        {emps.map((emp) => JSON.stringify(emp))}
    </>)
}

export default Employee