import { TaskContext } from "../../contexts/TaskContext"
import { useContext } from "react"

export const useTaskContext = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw Error('useTaskContext must be used inside an TaskContextProvider')
    }

    return context
}