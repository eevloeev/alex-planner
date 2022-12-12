import { Box, Typography } from "@mui/material"
import { useMemo } from "react"

interface ColumnTitleProps {
  children: React.ReactNode
  dayOfWeek?: Number
}

function ColumnTitle({ children, dayOfWeek = -1 }: ColumnTitleProps) {
  const isCurrentDay = useMemo(
    () => new Date().getDay() === dayOfWeek,
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
