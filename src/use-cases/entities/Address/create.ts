import { AddressRepository } from '@/repositories/adresses-repository'
import { Address } from '@prisma/client'

interface CreateAddressUseCaseProps {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  studentId: number
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddress {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    street,
    number,
    complement = '',
    neighborhood,
    city,
    state,
    zipCode,
    studentId,
  }: CreateAddressUseCaseProps): Promise<CreateAddressUseCaseResponse> {
    const address = await this.addressRepository.create({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      studentId,
    })

    return { address }
  }
}
