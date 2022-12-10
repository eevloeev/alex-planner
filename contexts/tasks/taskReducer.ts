import { MapTaskAction } from "types/MapTaskAction"
import { TaskReducer as TaskReducerType } from "types/TaskReducer"

const taskReducer: TaskReducerType = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case MapTaskAction.SET_TASKS:
      return {
        ...state,
        tasks: payload,
      }
    default:
      return state
  }
}

export { taskReducer }
