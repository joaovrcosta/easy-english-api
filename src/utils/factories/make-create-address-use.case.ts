import { PrismaAddressRepository } from '@/repositories/prisma/prisma-adresses-repository'
import { CreateAddress } from '@/use-cases/entities/Address/create'

export function makeCreateAddressUseCase() {
  const addressRepository = new PrismaAddressRepository()
  const useCase = new CreateAddress(addressRepository)

  return useCase
}
