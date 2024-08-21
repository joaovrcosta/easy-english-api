import { PrismaInvoiceRepository } from '@/repositories/prisma/prisma-invoices-repository'
import { ListInvoicesUseCase } from '@/use-cases/entities/Invoice/list-invoices'

export function makeListAllInvoicesUseCase() {
  const invoicesRepository = new PrismaInvoiceRepository()
  const useCase = new ListInvoicesUseCase(invoicesRepository)

  return useCase
}
