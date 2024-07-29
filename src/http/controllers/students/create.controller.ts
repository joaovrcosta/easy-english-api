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
    address: z
      .object({
        street: z.string(),
        number: z.string(),
        complement: z.string().optional(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
      })
      .optional(),
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
    address,
  } = createStudentBodySchema.parse(request.body)

  const createStudentUseCase = makeCreateStudentUseCase()

  try {
    const result = await createStudentUseCase.execute({
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
      address,
    })

    console.log(result, 'result')

    const { student, address: createdAddress } = result

    return reply.status(201).send({
      student,
      address: createdAddress,
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
}
