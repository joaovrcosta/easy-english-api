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

    // Arredondando para dois decimais
    const roundedInvoiceAmount = Math.round(rawInvoiceAmount * 100) / 100

    // Calculando o valor total das faturas arredondadas
    const totalRoundedValue = roundedInvoiceAmount * duration

    // Calculando a diferença
    const adjustment = Math.round((totalValue - totalRoundedValue) * 100) / 100

    const invoiceDate = new Date(startDate)

    for (let i = 0; i < duration; i++) {
      const dueDate = new Date(invoiceDate)
      dueDate.setMonth(dueDate.getMonth() + i)

      let amount = roundedInvoiceAmount

      // Ajuste na última fatura para garantir que o total seja igual ao totalValue
      if (i === duration - 1) {
        amount += adjustment
      }

      const invoice = await this.invoicesRepository.create({
        dueDate,
        amount,
        emission: new Date(),
        discount: 0,
        interest: 0,
        fine: 0,
        paid: false,
        contractId: contract.id,
        studentId,
      })

      invoices.push(invoice)
    }

    return { contract, invoices }
  }
}
