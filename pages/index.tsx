import { Grid } from "@mui/material"
import { ColumnTitle } from "components/ColumnTitle"
import Head from "next/head"
import { useTasks } from "contexts/tasks/taskContext"
import { Card } from "components/Card"
import { days } from "const/days"
import { ColumnFooter } from "components/ColumnFooter"
import { useMemo } from "react"

function Home() {
  const { tasks, dispatch } = useTasks()

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

  return (
    <div>
      <Head>
        <title>Alex Planner</title>
      </Head>
      <Grid container columns={8}>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Понедельник</ColumnTitle>
          <ul>
            {mondayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={mondayTasks.length}
            importantCount={mondayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Вторник</ColumnTitle>
          <ul>
            {tuesdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={tuesdayTasks.length}
            importantCount={tuesdayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Среда</ColumnTitle>
          <ul>
            {wednesdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={wednesdayTasks.length}
            importantCount={wednesdayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Четверг</ColumnTitle>
          <ul>
            {thursdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={thursdayTasks.length}
            importantCount={thursdayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Пятница</ColumnTitle>
          <ul>
            {fridayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={fridayTasks.length}
            importantCount={fridayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Суббота</ColumnTitle>
          <ul>
            {saturdayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={saturdayTasks.length}
            importantCount={saturdayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>Воскресенье</ColumnTitle>
          <ul>
            {sundayTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={sundayTasks.length}
            importantCount={sundayTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
        <Grid item xl={1} xs={8}>
          <ColumnTitle>ХАБ</ColumnTitle>
          <ul>
            {templateTasks.map((i) => (
              <Card key={i.id} task={i} />
            ))}
          </ul>
          <ColumnFooter
            totalCount={templateTasks.length}
            importantCount={templateTasks.filter((i) => i.isImportant).length}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
