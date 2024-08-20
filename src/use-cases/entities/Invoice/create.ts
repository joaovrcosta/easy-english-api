import { InvoicesRepository } from '@/repositories/invoices-repository'
import { Invoice } from '@prisma/client'

interface CreateInvoiceUseCaseProps {
  amount: number
  emission: Date
  dueDate: Date
  discount: number
  interest: number
  fine: number
  paid: boolean
  studentId: number
  contractId: string
}

interface CreateInvoiceUseCaseResponse {
  invoice: Invoice
}

export class CreateInvoice {
  constructor(private invoiceRepository: InvoicesRepository) {}

  async execute({
    amount,
    emission,
    dueDate,
    discount,
    interest,
    fine,
    paid,
    studentId,
    contractId,
  }: CreateInvoiceUseCaseProps): Promise<CreateInvoiceUseCaseResponse> {
    const invoice = await this.invoiceRepository.create({
      amount,
      emission,
      dueDate,
      discount,
      interest,
      fine,
      paid,
      studentId,
      contractId,
    })

    return { invoice }
  }
}
