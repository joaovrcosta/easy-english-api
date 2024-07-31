import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { InvoicesRepository } from '../invoices-repository'

export class PrismaInvoiceRepository implements InvoicesRepository {
  async create(data: Prisma.InvoiceUncheckedCreateInput) {
    return await prisma.invoice.create({ data })
  }
}
