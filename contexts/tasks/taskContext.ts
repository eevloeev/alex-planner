import { createContext, useContext } from "react"
import { TaskContext as TaskContextType } from "types/TaskContext"

const initialState: TaskContextType = {
  tasks: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    templates: [],
  },
  dispatch: () => {},
}

const taskContext = createContext<TaskContextType>(initialState)
const TaskProvider = taskContext.Provider
const TaskConsumer = taskContext.Consumer

function useTasks() {
  return useContext(taskContext)
}

export { TaskProvider, TaskConsumer, useTasks }
