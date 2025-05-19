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

  const currentDate = useMemo(() => {
    if (!dayOfWeek) return null
    const today = new Date()
    const dayIndex = getDayByName(dayOfWeek)
    const diff = dayIndex - (today.getDay() - 1)
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + diff)
    
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
    
    return `${targetDate.getDate()} ${months[targetDate.getMonth()]}`
  }, [dayOfWeek])

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
          fontSize: 16,
        }}
      >
        {children}, {currentDate}
      </Typography>
    </Box>
  )
}

export { ColumnTitle }
export type { ColumnTitleProps }
