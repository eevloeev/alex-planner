import "normalize.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect, useReducer } from "react"
import { apiRequest } from "utils/apiRequest"
import { taskReducer } from "contexts/tasks/taskReducer"
import { MapTaskAction } from "types/MapTaskAction"
import { TaskProvider } from "contexts/tasks/taskContext"
import { apiRoutes } from "const/apiRoutes"

function App({ Component, pageProps }: AppProps) {
  const initialTaskState = {
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
  const [taskState, dispatchTasks] = useReducer(taskReducer, initialTaskState)

  useEffect(() => {
    apiRequest(apiRoutes.v1.getTasks).then((response) => {
      dispatchTasks({
        type: MapTaskAction.SET_TASKS,
        payload: response.data,
      })
    })
  }, [])

  const taskContextValue = {
    tasks: taskState.tasks,
    dispatch: dispatchTasks,
  }

  return (
    <TaskProvider value={taskContextValue}>
      <Component {...pageProps} />
    </TaskProvider>
  )
}

export default App
