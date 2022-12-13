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
import { v4 as uuidv4 } from "uuid"
import { ColumnTitleTemplates } from "components/ColumnTitleTemplates"
import { ColumnFooterTemplates } from "components/ColumnFooterTemplates"
import { initialTaskState } from "pages/_app"

interface ColumnTemplatesProps {
  sx?: SxProps
  footer?: ReactNode
  setError: Dispatch<any>
}

function ColumnTemplates({ sx, footer, setError }: ColumnTemplatesProps) {
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
      templates: [
        {
          id: uuidv4(),
          content,
          isTemplate: true,
          day: null,
          isImportant: null,
          isDone: null,
        },
        ...tasks["templates"],
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

  const onDeleteAllHandle = useCallback(() => {
    setDeleteDialogIsOpen(false)
    const newTasks = {
      ...initialTaskState.tasks,
      templates: tasks["templates"],
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
  }, [tasks, dispatchTasks, setError])

  const onAddHandle = useCallback(() => {
    setInputIsOpen(true)
  }, [])

  const filteredTasks = useMemo(() => tasks["templates"], [tasks])

  return (
    <Grid
      item
      xl={1}
      xs={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        ...sx,
      }}
    >
      <ColumnTitleTemplates>ХАБ</ColumnTitleTemplates>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          padding: 1,
          paddingBottom: 9,
          height: "100%",
          overflowY: "auto",
        }}
      >
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
        <ColumnFooterTemplates
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
            Вы действительно хотите удалить все задачи?
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
          <Button onClick={onDeleteAllHandle} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export { ColumnTemplates }
