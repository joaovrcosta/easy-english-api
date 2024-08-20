import { PrismaGuardiasRepository } from '@/repositories/prisma/prisma-guardians-repository'
import { CreateGuardian } from '@/use-cases/entities/Guardian/create'

export function makeCreateGuardianUseCase() {
  const guardianRepository = new PrismaGuardiasRepository()
  const useCase = new CreateGuardian(guardianRepository)

  return useCase
}
