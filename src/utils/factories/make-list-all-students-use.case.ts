import { PrismaStudentRepository } from '@/repositories/prisma/prisma-students-repository'
import { ListAllStudentsUseCase } from '@/use-cases/entities/Student/list-all'

export function makeListAllStudentsUseCase() {
  const studentsRepository = new PrismaStudentRepository()
  const useCase = new ListAllStudentsUseCase(studentsRepository)

  return useCase
}
