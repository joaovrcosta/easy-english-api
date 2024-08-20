import { Invoice, Prisma } from '@prisma/client'

export interface InvoicesRepository {
  create(data: Prisma.InvoiceUncheckedCreateInput): Promise<Invoice>
}
