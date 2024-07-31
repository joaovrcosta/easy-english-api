import { makeCreateContractUseCase } from '@/utils/factories/make-create-contract-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createContractBodySchema = z.object({
    duration: z.number().min(1).max(12),
    active: z.boolean(),
    totalValue: z.number().positive(),
    startDate: z.string().transform((str) => new Date(str)),
    studentId: z.number(),
  })

  const { duration, active, totalValue, startDate, studentId } =
    createContractBodySchema.parse(request.body)

  const createContractUseCase = makeCreateContractUseCase()

  try {
    const { contract, invoices } = await createContractUseCase.execute({
      duration,
      active,
      totalValue,
      startDate,
      studentId,
    })

    return reply.status(201).send({
      message: 'Contract created successfully',
      contract,
      invoices,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.code(500).send({ message: err.message })
    } else {
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }
}
