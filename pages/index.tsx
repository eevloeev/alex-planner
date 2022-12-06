import { useState } from "react"
import { Grid } from "@mui/material"
import { ColumnTitle } from "components/ColumnTitle"
import Head from "next/head"
import { ReactSortable } from "react-sortablejs"

interface ItemType {
  id: number
  name: string
}

const SORTABLE_BOARD = "SORTABLE_BOARD"

export default function Home() {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
  ])

  return (
    <div>
      <Head>
        <title>Alex Planner</title>
      </Head>
      <Grid container columns={8}>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Понедельник</ColumnTitle>
          <ReactSortable group={SORTABLE_BOARD} list={state} setList={setState}>
            {state.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </ReactSortable>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Вторник</ColumnTitle>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Среда</ColumnTitle>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Четверг</ColumnTitle>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Пятница</ColumnTitle>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Суббота</ColumnTitle>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>Воскресенье</ColumnTitle>
        </Grid>
        <Grid xl={1} xs={8}>
          <ColumnTitle>ХАБ</ColumnTitle>
        </Grid>
      </Grid>
    </div>
  )
}
