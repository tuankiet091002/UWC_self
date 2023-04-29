import { NotificationContext } from "../../contexts/NotificationContext"
import { useContext } from "react"

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw Error('useotificationContext must be used inside an MCPContextProvider')
    }

    return context
}