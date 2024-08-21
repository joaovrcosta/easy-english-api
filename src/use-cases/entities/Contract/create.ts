import { ContractsRepository } from '@/repositories/contracts-repository'
import { InvoicesRepository } from '@/repositories/invoices-repository'
import { Contract, Invoice } from '@prisma/client'

interface CreateContractUseCaseProps {
  duration: number
  active: boolean
  totalValue: number
  startDate: Date | string
  studentId: number
}

interface CreateContractUseCaseResponse {
  contract: Contract
  invoices: Invoice[]
}

export class CreateContract {
  constructor(
    private contractRepository: ContractsRepository,
    private invoicesRepository: InvoicesRepository
  ) {}

  async execute({
    duration,
    active,
    totalValue,
    startDate,
    studentId,
  }: CreateContractUseCaseProps): Promise<CreateContractUseCaseResponse> {
    const start = new Date(startDate)
    const endDate = new Date(start)
    endDate.setMonth(start.getMonth() + duration)

    const contract = await this.contractRepository.create({
      duration,
      active,
      totalValue,
      startDate: start,
      endDate,
      studentId,
    })

    const invoices: Invoice[] = []
    const rawInvoiceAmount = totalValue / duration

    const roundedInvoiceAmount = Math.round(rawInvoiceAmount * 100) / 100

    const totalRoundedValue = roundedInvoiceAmount * duration

    const adjustment = Math.round((totalValue - totalRoundedValue) * 100) / 100

    const invoiceDate = new Date(startDate)

    for (let i = 0; i < duration; i++) {
      const dueDate = new Date(invoiceDate)
      dueDate.setMonth(dueDate.getMonth() + i)

      let amount = roundedInvoiceAmount

      if (i === duration - 1) {
        amount += adjustment
      }

      const amountInCents = Math.round(amount * 100)

      const invoice = await this.invoicesRepository.create({
        dueDate,
        amount: amountInCents,
        emission: new Date(),
        discount: 0,
        interest: 0,
        fine: 0,
        status: 'UNPAID',
        contractId: contract.id,
        studentId,
      })

      invoices.push(invoice)
    }

    return { contract, invoices }
  }
}
