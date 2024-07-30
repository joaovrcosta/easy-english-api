import { PrismaClassRepository } from '@/repositories/prisma/prisma-classes-repository'
import { CreateClass } from '@/use-cases/entities/Class/create'

export function makeCreateClassUseCase() {
  const classRepository = new PrismaClassRepository()
  const useCase = new CreateClass(classRepository)

  return useCase
}
