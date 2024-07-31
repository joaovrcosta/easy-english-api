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
    endDate.setMonth(start.getMonth() + duration) // Calcula o endDate com base na duração

    const contract = await this.contractRepository.create({
      duration,
      active,
      totalValue,
      startDate: start,
      endDate, // Armazena o endDate calculado
      studentId,
    })

    const invoices: Invoice[] = []
    const invoiceAmount = totalValue / duration
    const invoiceDate = new Date(startDate)

    for (let i = 0; i < duration; i++) {
      const dueDate = new Date(invoiceDate)
      dueDate.setMonth(dueDate.getMonth() + i)

      const invoice = await this.invoicesRepository.create({
        dueDate,
        amount: invoiceAmount,
        emission: new Date(), // Data da emissão
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
