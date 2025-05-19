import { Box, Typography } from "@mui/material"

interface ColumnTitleTemplatesProps {
  children: React.ReactNode
}

function ColumnTitleTemplates({ children }: ColumnTitleTemplatesProps) {
  return (
    <Box
      sx={{
        paddingY: 1,
        borderBottom: "2px solid #4C70A8",
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        sx={{
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export { ColumnTitleTemplates }
export type { ColumnTitleTemplatesProps }
