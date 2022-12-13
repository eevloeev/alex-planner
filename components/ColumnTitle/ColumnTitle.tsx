import { Box, Typography } from "@mui/material"
import { useMemo } from "react"
import { getDayByName } from "utils/getDayByName"

interface ColumnTitleProps {
  children: React.ReactNode
  dayOfWeek?: string
}

function ColumnTitle({ children, dayOfWeek }: ColumnTitleProps) {
  const isCurrentDay = useMemo(
    () =>
      dayOfWeek ? new Date().getDay() - 1 === getDayByName(dayOfWeek) : false,
    [dayOfWeek]
  )

  return (
    <Box
      sx={{
        paddingY: 1,
        borderBottom: `2px solid ${isCurrentDay ? "#EE8B8B" : "#4C70A8"}`,
      }}
    >
      <Typography
        variant="h6"
        color={isCurrentDay ? "#EE8B8B" : "primary"}
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export { ColumnTitle }
export type { ColumnTitleProps }
