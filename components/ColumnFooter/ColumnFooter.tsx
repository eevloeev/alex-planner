import { Box, IconButton, Stack, Typography } from "@mui/material"
import { MouseEventHandler, useMemo } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { getDayByName } from "utils/getDayByName"

interface ColumnFooterProps {
  totalCount: number
  importantCount: number
  dayOfWeek?: string
  onDelete: MouseEventHandler<HTMLButtonElement>
  onAdd: MouseEventHandler<HTMLButtonElement>
}

function ColumnFooter({
  totalCount,
  importantCount,
  dayOfWeek,
  onDelete,
  onAdd,
}: ColumnFooterProps) {
  const isCurrentDay = useMemo(
    () =>
      dayOfWeek ? new Date().getDay() - 1 === getDayByName(dayOfWeek) : false,
    [dayOfWeek]
  )

  return (
    <Box sx={{ textAlign: "center", marginTop: "auto", position: "relative" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: 1,
          justifyContent: "center",
          position: "absolute",
          bottom: "100%",
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, #ffffffff 65%, #ffffff77 80%, transparent)",
        }}
      >
        <IconButton onClick={onDelete}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton onClick={onAdd}>
          <AddIcon color="primary" />
        </IconButton>
      </Stack>
      <Box
        sx={{
          paddingY: 1,
          borderTop: `2px solid ${isCurrentDay ? "#EE8B8B" : "#4C70A8"}`,
        }}
      >
        <Typography color={isCurrentDay ? "#EE8B8B" : "primary"}>
          <>
            Дел: {totalCount}, Важных: {importantCount}
          </>
        </Typography>
      </Box>
    </Box>
  )
}

export { ColumnFooter }
export type { ColumnFooterProps }
