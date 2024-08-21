import { makeListAllInvoicesUseCase } from '@/utils/factories/make-list-all-invoices-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface ListAllInvoicesQuery {
  month?: number
  year?: number
  status?: 'PAID' | 'UNPAID' | 'PENDING' | 'SCHOLARSHIP'
  take?: number
  skip?: number
}

export async function listAllInvoices(
  req: FastifyRequest<{ Querystring: ListAllInvoicesQuery }>,
  res: FastifyReply
): Promise<void> {
  const listAllInvoicesUseCase = makeListAllInvoicesUseCase()

  try {
    const { month, year, status, take = 30, skip = 0 } = req.query

    console.log(year, 'params')

    const invoices = await listAllInvoicesUseCase.execute({
      month,
      year,
      status,
      take,
      skip,
    })

    res.status(200).send(invoices)
  } catch (error) {
    res.status(500).send({ error: (error as Error).message })
  }
}
