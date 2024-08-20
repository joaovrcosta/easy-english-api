import { makeCreateAddressUseCase } from '@/utils/factories/make-create-address-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAddressBodySchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    studentId: z.number().int(),
  })

  const {
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    studentId,
  } = createAddressBodySchema.parse(request.body)

  const createAddressUseCase = makeCreateAddressUseCase()

  try {
    await createAddressUseCase.execute({
      street,
      number,
      neighborhood,
      city,
      state,
      zipCode,
      studentId,
      complement,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.code(500).send({ message: err.message })
    } else {
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }

  return reply.status(201).send()
}
