// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getStore } from "services/storeService"
import Task from "types/Task"

type Data = [Task]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tasks = await getStore("tasks")
  res.json(tasks)
}
