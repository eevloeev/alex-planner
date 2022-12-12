import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material"
import { memo, useCallback, useState } from "react"
import { Task } from "types/Task"
import DoneIcon from "@mui/icons-material/Done"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import DeleteIcon from "@mui/icons-material/Delete"
import { useTasks } from "contexts/tasks/taskContext"
import { MapTaskAction } from "types/MapTaskAction"
import { apiRequest } from "utils/apiRequest"
import { apiRoutes } from "const/apiRoutes"

interface CardProps {
  task: Task
}

function Card({ task }: CardProps) {
  const [error, setError] = useState<any>(null)
  const { tasks, dispatch: dispatchTasks } = useTasks()
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
  } | null>(null)

  const handleRightClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : null
      )
    },
    [contextMenu, setContextMenu]
  )

  const handleClose = useCallback(() => {
    setContextMenu(null)
  }, [setContextMenu])

  const toggleIsDone = useCallback(() => {
    const newTasks = {
      ...tasks,
      [task.day]: [
        ...tasks[task.day as keyof typeof tasks].map((i) =>
          i.id === task.id
            ? {
                ...task,
                isDone: !task.isDone,
              }
            : i
        ),
      ],
    }
    apiRequest({
      ...apiRoutes.v1.editTasks,
      data: {
        tasks: newTasks,
      },
    })
      .then((response) => {
        dispatchTasks({
          type: MapTaskAction.SET_TASKS,
          payload: newTasks,
        })
      })
      .catch((error) => {
        console.error(error)
        setError({ ...error, isOpen: true })
      })
    handleClose()
  }, [tasks, task, dispatchTasks, handleClose])

  const toggleIsImportant = useCallback(() => {
    const newTasks = {
      ...tasks,
      [task.day]: [
        ...tasks[task.day as keyof typeof tasks].map((i) =>
          i.id === task.id
            ? {
                ...task,
                isImportant: !task.isImportant,
              }
            : i
        ),
      ],
    }
    apiRequest({
      ...apiRoutes.v1.editTasks,
      data: {
        tasks: newTasks,
      },
    })
      .then((response) => {
        dispatchTasks({
          type: MapTaskAction.SET_TASKS,
          payload: newTasks,
        })
      })
      .catch((error) => {
        console.error(error)
        setError({ ...error, isOpen: true })
      })
    handleClose()
  }, [tasks, task, dispatchTasks, handleClose])

  const deleteTask = useCallback(() => {
    const newTasks = {
      ...tasks,
      [task.day]: [
        ...tasks[task.day as keyof typeof tasks].filter(
          (i) => i.id !== task.id
        ),
      ],
    }
    apiRequest({
      ...apiRoutes.v1.editTasks,
      data: {
        tasks: newTasks,
      },
    })
      .then((response) => {
        dispatchTasks({
          type: MapTaskAction.SET_TASKS,
          payload: newTasks,
        })
      })
      .catch((error) => {
        console.error(error)
        setError({ ...error, isOpen: true })
      })
    handleClose()
  }, [tasks, task, dispatchTasks, handleClose])

  const closeError = () => {
    setError((err: any) => {
      if (typeof err === "object") return { ...err, isOpen: false }
    })
  }

  return (
    <Paper
      onContextMenu={handleRightClick}
      sx={{
        padding: 2,
        backgroundColor: task.isImportant ? "#EE8B8B" : "none",
        transition: ".2s background-color",
        ":hover": {
          "& .actions": {
            display: "flex",
          },
        },
      }}
    >
      <Typography
        sx={{
          textDecoration: task.isDone ? "line-through" : "none",
        }}
      >
        {task.content}
      </Typography>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={toggleIsDone}>
          <ListItemIcon>
            <DoneIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>
            {task.isDone ? "Не выполнено" : "Выполнено"}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={toggleIsImportant}>
          <ListItemIcon>
            <LocalFireDepartmentIcon fontSize="small" color="warning" />
          </ListItemIcon>
          <ListItemText>
            {task.isImportant ? "Не важное" : "Важное"}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={deleteTask}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={!!error?.isOpen} onClose={closeError}>
        <DialogTitle>Непредвиденная ошибка</DialogTitle>
        <DialogContent>
          <DialogContentText>{error?.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeError} autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export { Card }
export type { CardProps }
