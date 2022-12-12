import { Task } from "./Task"

type TaskContext = {
  tasks: {
    monday: Task[]
    tuesday: Task[]
    wednesday: Task[]
    thursday: Task[]
    friday: Task[]
    saturday: Task[]
    sunday: Task[]
    templates: Task[]
  }
  dispatch: React.Dispatch<any>
}

export type { TaskContext }
