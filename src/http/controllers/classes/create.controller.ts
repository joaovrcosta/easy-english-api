import { makeCreateClassUseCase } from '@/utils/factories/make-create-class-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTeacherBodySchema = z.object({
    name: z.string(),
    acronym: z.string(),
    valuePerHour: z.number(),
    category: z.string(),
    language: z.string(),
    available: z.boolean(),
    avaliation: z.number(),
    teacherId: z.number().optional().nullable(),
  })

  const {
    acronym,
    name,
    valuePerHour,
    category,
    language,
    available,
    avaliation,
    teacherId,
  } = createTeacherBodySchema.parse(request.body)

  const createClassUseCase = makeCreateClassUseCase()

  try {
    await createClassUseCase.execute({
      acronym,
      name,
      valuePerHour,
      category,
      language,
      available,
      avaliation,
      teacherId,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.code(500).send({ message: err.message })
    } else {
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }
}
