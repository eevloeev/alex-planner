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
import { useCallback, useState } from "react"
import { Column } from "components/Column"

function Home() {
  const [error, setError] = useState<any>(null)
  const { tasks, dispatch: dispatchTasks } = useTasks()

  const closeError = useCallback(() => {
    setError((err: any) => {
      if (typeof err === "object") return { ...err, isOpen: false }
    })
  }, [setError])

  return (
    <div>
      <Head>
        <title>Алекс Планнер</title>
      </Head>
      <Grid container columns={8} sx={{ height: "100vh" }}>
        {Object.values(days).map((day) => (
          <Column
            key={day}
            sx={{ borderRight: "2px solid #4C70A8" }}
            dayOfWeek={day}
            setError={setError}
          />
        ))}
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
            {tasks.templates.map((i) => (
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
