import { Task } from "./Task"

type TaskContext = {
  tasks: Task[]
  dispatch: React.Dispatch<any>
}

export type { TaskContext }
