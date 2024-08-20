import { prisma } from '@/lib/prisma'
import { StudentRepository } from '../students-repository'
import { Student, Address, Prisma } from '@prisma/client'

export class PrismaStudentRepository implements StudentRepository {
  async create(
    studentData: Prisma.StudentUncheckedCreateInput
  ): Promise<Student> {
    return await prisma.student.create({ data: studentData })
  }

  async listAll(): Promise<Student[]> {
    return await prisma.student.findMany()
  }
}
