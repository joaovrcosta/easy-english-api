import { makeCreateScheduleUseCase } from '@/utils/factories/make-create-schedule-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createScheduleBodySchema = z.object({
    dayOfWeek: z.array(
      z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ])
    ),
    startTime: z.string().transform((str) => new Date(str)),
    endTime: z.string().transform((str) => new Date(str)),
    teacherId: z.number(),
    courseId: z.number(),
  })

  const { dayOfWeek, startTime, endTime, teacherId, courseId } =
    createScheduleBodySchema.parse(request.body)

  const createScheduleUseCase = makeCreateScheduleUseCase()

  try {
    await createScheduleUseCase.execute({
      dayOfWeek,
      startTime,
      endTime,
      teacherId,
      courseId,
    })

    return reply.status(201).send({ message: 'Schedule created successfully' })
  } catch (err) {
    if (err instanceof Error) {
      return reply.code(500).send({ message: err.message })
    } else {
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }
}
