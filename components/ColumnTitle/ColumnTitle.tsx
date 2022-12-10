interface ColumnTitleProps {
  children: React.ReactNode
}

function ColumnTitle({ children }: ColumnTitleProps) {
  return <div>{children}</div>
}

export { ColumnTitle }
export type { ColumnTitleProps }
