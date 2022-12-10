// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getStore } from "services/storeService"
import { Task } from "types/Task"

type Data = [Task]

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const tasks = await getStore("tasks")
    res.json(tasks)
  } else {
    res.status(404).end()
  }
}

export default handler
