import { InvalidCPFFormat } from '@/utils/errors/students/invalidCPFformat.error'
import { InvalidRGFormat } from '@/utils/errors/students/invalidRGFormat.error'
import { makeCreateStudentUseCase } from '@/utils/factories/make-create-student-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createStudentBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    birthDay: z.string().transform((str) => new Date(str)),
    civil_state: z.string(),
    religion: z.string(),
    cpf: z.string(),
    rg: z.string(),
    nationality: z.string(),
    sex: z.string(),
  })

  const {
    name,
    email,
    phone,
    birthDay,
    civil_state,
    religion,
    cpf,
    rg,
    nationality,
    sex,
  } = createStudentBodySchema.parse(request.body)

  const createStudentUseCase = makeCreateStudentUseCase()

  try {
    await createStudentUseCase.execute({
      name,
      email,
      phone,
      birthDay,
      civil_state,
      religion,
      cpf,
      rg,
      nationality,
      sex,
    })
  } catch (err) {
    if (err instanceof InvalidCPFFormat) {
      return reply.code(400).send({ message: 'Invalid CPF format' })
    }
    if (err instanceof InvalidRGFormat) {
      return reply.code(400).send({ message: 'Invalid RG format' })
    }
    if (err instanceof Error) {
      return reply.code(500).send({ message: err.message })
    } else {
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }

  return reply.status(201).send()
}
