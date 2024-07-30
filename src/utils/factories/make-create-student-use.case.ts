import { PrismaAddressRepository } from '@/repositories/prisma/prisma-adresses-repository'
import { PrismaGuardiasRepository } from '@/repositories/prisma/prisma-guardians-repository'
import { PrismaStudentRepository } from '@/repositories/prisma/prisma-students-repository'
import { CreateStudent } from '@/use-cases/entities/Student/create'

export function makeCreateStudentUseCase() {
  const studentRepository = new PrismaStudentRepository()
  const addressRepository = new PrismaAddressRepository()
  const guardianRepository = new PrismaGuardiasRepository()

  return new CreateStudent(
    studentRepository,
    addressRepository,
    guardianRepository
  )
}
