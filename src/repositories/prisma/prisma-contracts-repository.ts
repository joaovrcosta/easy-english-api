import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ContractsRepository } from '../contracts-repository'

export class PrismaContractRepository implements ContractsRepository {
  async create(data: Prisma.ContractUncheckedCreateInput) {
    return await prisma.contract.create({ data })
  }
}
