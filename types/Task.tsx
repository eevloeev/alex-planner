type Task = {
  id: string
  content: string
  isTemplate: boolean
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  isImportant: boolean
  isDone: boolean
}

export type { Task }
