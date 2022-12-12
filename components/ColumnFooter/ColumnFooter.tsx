import { Box, IconButton, Stack, Typography } from "@mui/material"
import { MouseEventHandler, useMemo } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

interface ColumnFooterProps {
  totalCount: Number
  importantCount: Number
  dayOfWeek?: Number
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
    () => new Date().getDay() === dayOfWeek,
    [dayOfWeek]
  )

  return (
    <Box sx={{ textAlign: "center", marginTop: "auto" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: 1, justifyContent: "center" }}
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