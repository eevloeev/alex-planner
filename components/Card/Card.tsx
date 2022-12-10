import React from "react"
import { Task } from "types/Task"

interface CardProps {
  task: Task
}

function Card({ task }: CardProps) {
  return <li>{task.content}</li>
}

export { Card }
export type { CardProps }
