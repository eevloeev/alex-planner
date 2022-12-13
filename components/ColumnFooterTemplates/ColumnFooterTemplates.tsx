import { Box, IconButton, Stack, Button } from "@mui/material"
import { MouseEventHandler } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import AddIcon from "@mui/icons-material/Add"

interface ColumnFooterTemplatesProps {
  onDelete: MouseEventHandler<HTMLButtonElement>
  onAdd: MouseEventHandler<HTMLButtonElement>
}

function ColumnFooterTemplates({
  onDelete,
  onAdd,
}: ColumnFooterTemplatesProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "auto",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        background:
          "linear-gradient(to top, #ffffffff 65%, #ffffff77 80%, transparent)",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ paddingTop: 6, paddingBottom: 2, justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          color="error"
          onClick={onDelete}
        >
          Сброс
        </Button>
        <IconButton onClick={onAdd}>
          <AddIcon color="primary" />
        </IconButton>
      </Stack>
    </Box>
  )
}

export { ColumnFooterTemplates }
export type { ColumnFooterTemplatesProps }
