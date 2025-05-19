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
  MouseEventHandler,
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

interface ColumnProps {
  sx?: SxProps
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
    createTask(inputValue)
    setInputValue("")
  }

  const createTask = (content: string) => {
    const newTasks = {
      ...tasks,
      [dayOfWeek]: [
        ...tasks[dayOfWeek as keyof typeof tasks],
        {
          id: uuidv4(),
          content,
          isTemplate: false,
          day: dayOfWeek,
          isImportant: false,
          isDone: false,
        },
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
      createTask(inputValue)
      setInputValue("")
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

  const onDoubleClickHandle = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    if (event.target === event.currentTarget) {
      setInputIsOpen(true)
    }
  }, [])

  const filteredTasks = useMemo(
    () => tasks[dayOfWeek as keyof typeof tasks],
    [tasks, dayOfWeek]
  )

  return (
    <Grid
      item
      lg={1}
      xs={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        ...sx,
      }}
    >
      <ColumnTitle dayOfWeek={dayOfWeek}>
        {daysTranslate[dayOfWeek]}
      </ColumnTitle>
      <Stack
        direction="column"
        spacing={2}
        sx={{ padding: 1, paddingBottom: 24, height: "100%", overflowY: "auto" }}
        onDoubleClick={onDoubleClickHandle}
      >
        {filteredTasks.map((i) => (
          <Card key={i.id} task={i} />
        ))}
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
      </Stack>
      {footer ?? (
        <ColumnFooter
          totalCount={filteredTasks.filter((i) => !i.isDone).length}
          importantCount={
            filteredTasks.filter((i) => i.isImportant && !i.isDone).length
          }
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
