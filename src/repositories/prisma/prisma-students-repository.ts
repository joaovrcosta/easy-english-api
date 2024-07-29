import { prisma } from '@/lib/prisma'
import { StudentRepository } from '../students-repository'
import { Prisma } from '@prisma/client'

export class PrismaStudentsRepository implements StudentRepository {
  async create(data: Prisma.StudentUncheckedCreateInput) {
    return await prisma.student.create({ data })
  }
}
