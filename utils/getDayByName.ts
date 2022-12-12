import { days } from "const/days"

const getDayByName = (name: string): number => Object.values(days).indexOf(name)

export { getDayByName }
