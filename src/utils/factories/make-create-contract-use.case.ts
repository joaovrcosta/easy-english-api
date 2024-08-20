import { PrismaContractRepository } from '@/repositories/prisma/prisma-contracts-repository'
import { PrismaInvoiceRepository } from '@/repositories/prisma/prisma-invoices-repository'

import { CreateContract } from '@/use-cases/entities/Contract/create'

export function makeCreateContractUseCase() {
  const contractRepository = new PrismaContractRepository()
  const invoiceRepository = new PrismaInvoiceRepository()

  return new CreateContract(contractRepository, invoiceRepository)
}
