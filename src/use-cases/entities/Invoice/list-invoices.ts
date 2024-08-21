import { InvoicesRepository } from '@/repositories/invoices-repository'
import { Invoice } from '@prisma/client'

interface ListInvoicesRequest {
  page?: number
  limit?: number
  month?: number
  year?: number
  take?: number
  skip?: number
  status?: 'PAID' | 'UNPAID' | 'PENDING' | 'SCHOLARSHIP'
}

interface ListInvoicesResponse {
  invoices: Invoice[]
  total: number
  page: number
  limit: number
}

export class ListInvoicesUseCase {
  constructor(private invoiceRepository: InvoicesRepository) {}

  async execute({
    page = 1,
    limit = 30,
    month,
    year,
    status,
  }: ListInvoicesRequest): Promise<ListInvoicesResponse> {
    const offset = (page - 1) * limit

    const filters: any = {}
    if (month) filters.month = month
    if (year) filters.year = year
    if (status) filters.status = status

    const [invoices, total] = await this.invoiceRepository.listAll({
      take: limit,
      skip: offset,
      where: filters,
    })

    return {
      invoices,
      total,
      page,
      limit,
    }
  }
}
