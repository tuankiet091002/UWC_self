import React, { useEffect } from 'react'

import { useTruckContext } from '../hooks/Trucks/useTruckContext'
import { useGetTrucks } from '../hooks/Trucks/useGetTrucks'

const Truck = () => {
    const { trucks } = useTruckContext()
    const { getTrucks, isLoading, error } = useGetTrucks()

    useEffect(() => {
        getTrucks()
    }, [])


    return (<>
        {error ? error.message : null}
        {trucks.map((truck) => JSON.stringify(truck))}
    </>)
}

export default Truck