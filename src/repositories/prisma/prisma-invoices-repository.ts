import { prisma } from '@/lib/prisma'
import { Invoice, Prisma } from '@prisma/client'
import { InvoicesRepository } from '../invoices-repository'

export class PrismaInvoiceRepository implements InvoicesRepository {
  async create(data: Prisma.InvoiceUncheckedCreateInput) {
    return await prisma.invoice.create({ data })
  }

  async listAll({
    take,
    skip,
    where,
  }: {
    take: number
    skip: number
    where?: {
      month?: number
      year?: number
      status?: 'PAID' | 'UNPAID' | 'PENDING' | 'SCHOLARSHIP'
    }
  }): Promise<[Invoice[], number]> {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const startDate =
      where?.year && where?.month
        ? new Date(where.year, where.month - 1, 1)
        : new Date(currentYear, currentMonth - 1, 1)
    const endDate =
      where?.year && where?.month
        ? new Date(where.year, where.month, 0, 23, 59, 59, 999)
        : new Date(currentYear, currentMonth, 0, 23, 59, 59, 999)

    const invoices = await prisma.invoice.findMany({
      take,
      skip,
      where: {
        AND: [
          {
            dueDate: {
              gte: startDate,
              lt: new Date(endDate.setDate(endDate.getDate() + 1)),
            },
          },
          where?.status ? { status: where.status } : {},
        ],
      },
    })

    const total = await prisma.invoice.count({
      where: {
        AND: [
          {
            dueDate: {
              gte: startDate,
              lt: new Date(endDate.setDate(endDate.getDate() + 1)),
            },
          },
          where?.status ? { status: where.status } : {},
        ],
      },
    })

    return [invoices, total]
  }
}
