import { makeCreateContractUseCase } from '@/utils/factories/make-create-contract-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createContractBodySchema = z.object({
    duration: z.number().min(1).max(12),
    active: z.boolean(),
    totalValue: z.number().positive(),
    startDate: z
      .string()
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: 'Invalid date format',
      })
      .transform((str) => new Date(str)),
    studentId: z.number(),
  })

  try {
    const { duration, active, totalValue, startDate, studentId } =
      createContractBodySchema.parse(request.body)

    const createContractUseCase = makeCreateContractUseCase()

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
    if (err instanceof z.ZodError) {
      // Erro de validação do Zod
      return reply.status(400).send({ message: err.errors })
    } else if (err instanceof Error) {
      // Erros gerais
      return reply.code(500).send({ message: err.message })
    } else {
      // Erro desconhecido
      return reply.code(500).send({ message: 'Unknown error occurred' })
    }
  }
}
