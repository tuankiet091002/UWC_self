import { TruckContext } from "../../contexts/TruckContext"
import { useContext } from "react"

export const useTruckContext = () => {
    const context = useContext(TruckContext)

    if (!context) {
        throw Error('useTruckContext must be used inside an TruckContextProvider')
    }

    return context
}