import { prisma } from '@/lib/prisma'
import { StudentRepository } from '../students-repository'
import { Student, Address, Prisma } from '@prisma/client'

export class PrismaStudentRepository implements StudentRepository {
  async create(
    studentData: Prisma.StudentUncheckedCreateInput
  ): Promise<Student> {
    return await prisma.student.create({ data: studentData })
  }

  async createWithAddress(
    studentData: Prisma.StudentUncheckedCreateInput,
    addressData?: Prisma.AddressUncheckedCreateInput
  ): Promise<{ student: Student; address?: Address }> {
    return await prisma.$transaction(async (prisma) => {
      const student = await prisma.student.create({ data: studentData })

      if (addressData) {
        const address = await prisma.address.create({
          data: { ...addressData, studentId: student.id },
        })
        return { student, address }
      }

      return { student }
    })
  }
}
