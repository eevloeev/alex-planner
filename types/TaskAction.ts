import { MapTaskAction } from "types/MapTaskAction"

type TaskAction = {
  type: MapTaskAction.SET_TASKS
  payload: any
}

export type { TaskAction }
