// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { writeStore } from "services/storeService"
import Task from "types/Task"
import Joi from "joi"
import httpStatus from "http-status"

const requestBodySchema = Joi.object({
  tasks: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().guid({ version: "uuidv4" }).required(),
        content: Joi.string().required(),
        order: Joi.number().required(),
        isTemplate: Joi.bool().required(),
        day: Joi.number().min(0).max(6).required().allow(null),
        isImportant: Joi.bool().required().allow(null),
        isDone: Joi.bool().required().allow(null),
      })
    )
    .required(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const bodyValidation = requestBodySchema.validate(req.body, {
      abortEarly: false,
    })

    if (bodyValidation.error) {
      res.status(httpStatus.BAD_REQUEST).json(bodyValidation.error.details)
      return
    }

    await writeStore("tasks", req.body.tasks)
    res.status(200).end()
  } else {
    res.status(404).end()
  }
}
