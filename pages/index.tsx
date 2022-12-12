import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material"
import { ColumnTitle } from "components/ColumnTitle"
import Head from "next/head"
import { useTasks } from "contexts/tasks/taskContext"
import { Card } from "components/Card"
import { days } from "const/days"
import { ColumnFooter } from "components/ColumnFooter"
import { useMemo, useState } from "react"
import { apiRequest } from "utilities/apiRequest"
import { apiRoutes } from "const/api-routes"
import { MapTaskAction } from "types/MapTaskAction"

function Home() {
  const [error, setError] = useState<any>(null)
  const { tasks, dispatch: dispatchTasks } = useTasks()

  const mondayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.MONDAY),
    [tasks]
  )

  const tuesdayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.TUESDAY),
    [tasks]
  )

  const wednesdayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.WEDNESDAY),
    [tasks]
  )

  const thursdayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.THURSDAY),
    [tasks]
  )

  const fridayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.FRIDAY),
    [tasks]
  )

  const saturdayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.SATURDAY),
    [tasks]
  )

  const sundayTasks = useMemo(
    () => tasks.filter((i) => i.day === days.SUNDAY),
    [tasks]
  )

  const templateTasks = useMemo(
    () => tasks.filter((i) => i.isTemplate),
    [tasks]
  )

  const onDeleteByDayHandle = (day: Number) => () => {
    const newTasks = [...tasks.filter((i) => i.day !== day)]
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
  }

  const closeError = () => {
    setError((err: any) => {
      if (typeof err === "object") return { ...err, isOpen: false }
    })
  }

  return (
    <div>
      <Head>
        <title>Alex Planner</title>
      </Head>
      <Grid container columns={8} sx={{ height: "100vh" }}>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.MONDAY}>Понедельник</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {mondayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={mondayTasks.length}
            importantCount={mondayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.MONDAY}
            onDelete={onDeleteByDayHandle(days.MONDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.TUESDAY}>Вторник</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {tuesdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={tuesdayTasks.length}
            importantCount={tuesdayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.TUESDAY}
            onDelete={onDeleteByDayHandle(days.TUESDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.WEDNESDAY}>Среда</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {wednesdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={wednesdayTasks.length}
            importantCount={wednesdayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.WEDNESDAY}
            onDelete={onDeleteByDayHandle(days.WEDNESDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.THURSDAY}>Четверг</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {thursdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={thursdayTasks.length}
            importantCount={thursdayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.THURSDAY}
            onDelete={onDeleteByDayHandle(days.THURSDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.FRIDAY}>Пятница</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {fridayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={fridayTasks.length}
            importantCount={fridayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.FRIDAY}
            onDelete={onDeleteByDayHandle(days.FRIDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.SATURDAY}>Суббота</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {saturdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={saturdayTasks.length}
            importantCount={saturdayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.SATURDAY}
            onDelete={onDeleteByDayHandle(days.SATURDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #4C70A8",
          }}
        >
          <ColumnTitle dayOfWeek={days.SUNDAY}>Воскресенье</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {sundayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
          <ColumnFooter
            totalCount={sundayTasks.length}
            importantCount={sundayTasks.filter((i) => i.isImportant).length}
            dayOfWeek={days.SUNDAY}
            onDelete={onDeleteByDayHandle(days.SUNDAY)}
          />
        </Grid>
        <Grid
          item
          xl={1}
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ColumnTitle>ХАБ</ColumnTitle>
          <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
            {templateTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </Stack>
        </Grid>
      </Grid>
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
    </div>
  )
}

export default Home
