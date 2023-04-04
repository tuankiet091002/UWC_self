import { EmpContext } from "../../contexts/EmpContext"
import { useContext } from "react"

export const useEmpContext = () => {
    const context = useContext(EmpContext)

    if (!context) {
        throw Error('useEmpContext must be used inside an EmpContextProvider')
    }

    return context
}