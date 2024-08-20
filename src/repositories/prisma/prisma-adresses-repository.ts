import { prisma } from '@/lib/prisma'
import { AddressRepository } from '../adresses-repository'
import { Prisma } from '@prisma/client'

export class PrismaAddressRepository implements AddressRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    return await prisma.address.create({ data })
  }
}
