import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material"
import { ColumnFooter } from "components/ColumnFooter"
import { ColumnTitle } from "components/ColumnTitle"
import { Card } from "components/Card"
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react"
import { apiRequest } from "utils/apiRequest"
import { apiRoutes } from "const/apiRoutes"
import { useTasks } from "contexts/tasks/taskContext"
import { MapTaskAction } from "types/MapTaskAction"
import { daysTranslate, daysDeleteTranslate } from "const/days"
import { v4 as uuidv4 } from "uuid"
import { Task } from "types/Task"

interface ColumnProps {
  sx: SxProps
  dayOfWeek: string
  footer?: ReactNode
  setError: Dispatch<any>
}

function Column({ sx, dayOfWeek, footer, setError }: ColumnProps) {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [inputIsOpen, setInputIsOpen] = useState(false)
  const { tasks, dispatch: dispatchTasks } = useTasks()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleBlur = () => {
    setInputIsOpen(false)
  }

  const createTask = (content: string) => {
    const newTasks = {
      ...tasks,
      [dayOfWeek]: [
        {
          id: uuidv4(),
          content,
          isTemplate: false,
          day: dayOfWeek,
          isImportant: false,
          isDone: false,
        },
        ...tasks[dayOfWeek as keyof typeof tasks],
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
      })
      .catch((error) => {
        console.error(error)
        setError({ ...error, isOpen: true })
      })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setInputIsOpen(false)
      setInputValue("")
      createTask(inputValue)
    } else if (event.key === "Escape") {
      setInputIsOpen(false)
    }
  }

  const onDeleteByDayHandle = useCallback(() => {
    setDeleteDialogIsOpen(false)
    const newTasks = { ...tasks, [dayOfWeek]: [] }
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
      })
      .catch((error) => {
        console.error(error)
        setError({ ...error, isOpen: true })
      })
  }, [tasks, dispatchTasks, setError, dayOfWeek])

  const onAddHandle = useCallback(() => {
    setInputIsOpen(true)
  }, [])

  const filteredTasks = useMemo(
    () => tasks[dayOfWeek as keyof typeof tasks],
    [tasks, dayOfWeek]
  )

  return (
    <Grid
      item
      xl={1}
      xs={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <ColumnTitle dayOfWeek={dayOfWeek}>
        {daysTranslate[dayOfWeek]}
      </ColumnTitle>
      <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
        {inputIsOpen && (
          <Paper sx={{ padding: 2 }}>
            <TextField
              value={inputValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              multiline
              variant="standard"
              placeholder="Описание задачи"
            />
          </Paper>
        )}
        {filteredTasks.map((i) => (
          <Card key={i.id} task={i} />
        ))}
      </Stack>
      {footer ?? (
        <ColumnFooter
          totalCount={filteredTasks.length}
          importantCount={filteredTasks.filter((i) => i.isImportant).length}
          dayOfWeek={dayOfWeek}
          onDelete={() => {
            setDeleteDialogIsOpen(true)
          }}
          onAdd={onAddHandle}
        />
      )}
      <Dialog
        open={deleteDialogIsOpen}
        onClose={() => {
          setDeleteDialogIsOpen(false)
        }}
      >
        <DialogTitle>
          <Typography variant="body1">
            {daysDeleteTranslate[dayOfWeek]}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogIsOpen(false)
            }}
          >
            Отмена
          </Button>
          <Button onClick={onDeleteByDayHandle} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export { Column }
