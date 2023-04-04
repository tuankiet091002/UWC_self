import { MCPContext } from "../../contexts/MCPContext"
import { useContext } from "react"

export const useMCPContext = () => {
    const context = useContext(MCPContext)

    if (!context) {
        throw Error('useMCPContext must be used inside an MCPContextProvider')
    }

    return context
}