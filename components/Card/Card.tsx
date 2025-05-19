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
  TextField,
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
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.content)
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

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true)
    setEditValue(task.content)
  }, [task.content])

  const handleEditChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value)
  }, [])

  const handleEditSave = useCallback(() => {
    if (!editValue.trim()) return
    
    const newTasks = {
      ...tasks,
      [task.isTemplate ? "templates" : task.day]: [
        ...tasks[task.isTemplate ? "templates" : (task.day)].map((i) =>
          i.id === task.id
            ? {
                ...task,
                content: editValue.trim(),
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
      .then(() => {
        dispatchTasks({
          type: MapTaskAction.SET_TASKS,
          payload: newTasks,
        })
        setIsEditing(false)
      })
      .catch((error) => {
        console.error(error)
        setError({ ...error, isOpen: true })
      })
  }, [tasks, task, editValue, dispatchTasks])

  const handleEditKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEditSave()
    } else if (event.key === "Escape") {
      setIsEditing(false)
      setEditValue(task.content)
    }
  }, [task.content, handleEditSave])

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
      [task.isTemplate ? "templates" : task.day]: [
        ...tasks[
          task.isTemplate ? "templates" : (task.day as keyof typeof tasks)
        ].filter((i) => i.id !== task.id),
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
      onDoubleClick={handleDoubleClick}
      sx={{
        padding: 2,
        backgroundColor: task.isImportant ? "#fbe38d" : "none",
        opacity: task.isDone ? ".5" : "1",
        transition: ".2s background-color",
        ":hover": {
          "& .actions": {
            display: "flex",
          },
        },
      }}
    >
      {isEditing ? (
        <TextField
          value={editValue}
          onChange={handleEditChange}
          onBlur={handleEditSave}
          onKeyDown={handleEditKeyDown}
          autoFocus
          multiline
          variant="standard"
          fullWidth
        />
      ) : (
        <Typography
          sx={{
            textDecoration: task.isDone ? "line-through" : "none",
            lineHeight: 1.3,
          }}
        >
          {task.content}
        </Typography>
      )}
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
        {!task.isTemplate && (
          <>
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
          </>
        )}
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
