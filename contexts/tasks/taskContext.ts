import { createContext, useContext } from "react"
import { TaskContext as TaskContextType } from "types/TaskContext"

const initialState: TaskContextType = {
  tasks: [],
  dispatch: () => {},
}

const taskContext = createContext<TaskContextType>(initialState)
const TaskProvider = taskContext.Provider
const TaskConsumer = taskContext.Consumer

function useTasks() {
  return useContext(taskContext)
}

export { taskContext, TaskProvider, TaskConsumer, useTasks }