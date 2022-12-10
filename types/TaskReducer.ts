import { TaskContext } from "types/TaskContext"
import { TaskAction } from "./TaskAction"

type TaskReducer = (state: TaskContext, action: TaskAction) => TaskContext

export type { TaskReducer }
