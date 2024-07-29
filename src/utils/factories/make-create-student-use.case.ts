import { PrismaAddressRepository } from '@/repositories/prisma/prisma-adresses-repository'
import { PrismaStudentRepository } from '@/repositories/prisma/prisma-students-repository'
import { CreateStudent } from '@/use-cases/entities/Student/create'

export function makeCreateStudentUseCase() {
  const studentRepository = new PrismaStudentRepository()
  const addressRepository = new PrismaAddressRepository()

  return new CreateStudent(studentRepository, addressRepository)
}
