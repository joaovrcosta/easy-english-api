import { Invoice, Prisma } from '@prisma/client'

export interface InvoicesRepository {
  create(data: Prisma.InvoiceUncheckedCreateInput): Promise<Invoice>
  listAll(params: {
    take: number
    skip: number
    where?: {
      month?: number
      year?: number
      status?: 'PAID' | 'UNPAID' | 'PENDING' | 'SCHOLARSHIP'
    }
  }): Promise<[Invoice[], number]>
}
