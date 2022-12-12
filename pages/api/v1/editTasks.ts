// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { writeStore } from "services/storeService"
import Joi from "joi"
import httpStatus from "http-status"
import { days } from "const/days"

const TaskArraySchema = Joi.array()
  .items(
    Joi.object({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      content: Joi.string().required(),
      isTemplate: Joi.bool().required(),
      day: Joi.any()
        .valid(...Object.values(days))
        .required()
        .allow(null),
      isImportant: Joi.bool().required().allow(null),
      isDone: Joi.bool().required().allow(null),
    })
  )
  .required()

const RequestBodySchema = Joi.object({
  tasks: Joi.object({
    monday: TaskArraySchema,
    tuesday: TaskArraySchema,
    wednesday: TaskArraySchema,
    thursday: TaskArraySchema,
    friday: TaskArraySchema,
    saturday: TaskArraySchema,
    sunday: TaskArraySchema,
    templates: TaskArraySchema,
  }),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const bodyValidation = RequestBodySchema.validate(req.body, {
      abortEarly: false,
    })

    if (bodyValidation.error) {
      res.status(httpStatus.BAD_REQUEST).json(bodyValidation.error.details)
      return
    }

    const tasks = req.body.tasks
    await writeStore("tasks", tasks)
    res.json(tasks)
  } else {
    res.status(404).end()
  }
}

export default handler
