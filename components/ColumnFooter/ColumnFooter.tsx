interface ColumnFooterProps {
  totalCount: Number
  importantCount: Number
}

function ColumnFooter({ totalCount, importantCount }: ColumnFooterProps) {
  return (
    <div>
      <>
        Дел: {totalCount}, Важных: {importantCount}
      </>
    </div>
  )
}

export { ColumnFooter }
export type { ColumnFooterProps }
