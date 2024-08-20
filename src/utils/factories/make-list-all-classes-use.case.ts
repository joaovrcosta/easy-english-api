import { PrismaClassRepository } from '@/repositories/prisma/prisma-classes-repository'
import { ListAllClassesUseCase } from '@/use-cases/entities/Class/list-all'

export function makeListAllClassesUseCase() {
  const classesRepository = new PrismaClassRepository()
  const useCase = new ListAllClassesUseCase(classesRepository)

  return useCase
}
