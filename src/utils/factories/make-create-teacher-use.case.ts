import { PrismaTeacherRepository } from '@/repositories/prisma/prisma-teacher-repository'
import { CreateTeacher } from '@/use-cases/entities/Teacher/create'

export function makeCreateTeacherUseCase() {
  const teacherRepository = new PrismaTeacherRepository()
  const useCase = new CreateTeacher(teacherRepository)

  return useCase
}
