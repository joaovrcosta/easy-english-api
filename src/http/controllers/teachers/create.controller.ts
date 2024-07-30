import { makeCreateTeacherUseCase } from '@/utils/factories/make-create-teacher-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTeacherBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    birthDay: z.string().transform((str) => new Date(str)),
  })

  const { name, email, phone, birthDay } = createTeacherBodySchema.parse(
    request.body
  )

  const createTeacherUseCase = makeCreateTeacherUseCase()

  try {
    await createTeacherUseCase.execute({
      name,
      email,
      phone,
      birthDay,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.code(500).send({ message: err.message })
    } else {
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }
}
