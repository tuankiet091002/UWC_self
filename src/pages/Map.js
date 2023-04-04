import React, { useEffect } from 'react'

import { useMCPContext } from '../hooks/MCPs/useMCPContext'
import { useGetMCPs } from '../hooks/MCPs/useGetMCPs'

const Map = () => {
    const { mcps } = useMCPContext()
    const { getMCPs, isLoading, error } = useGetMCPs()

    useEffect(() => {
        getMCPs()
    }, [])


    return (<>
        {error ? error.message : null}
        {mcps.map((mcp) => JSON.stringify(mcp))}
    </>)
}

export default Map