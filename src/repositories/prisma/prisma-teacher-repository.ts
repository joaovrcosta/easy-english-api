import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { TeacherRepository } from '../teacher-repository'

export class PrismaTeacherRepository implements TeacherRepository {
  async create(data: Prisma.TeacherUncheckedCreateInput) {
    return await prisma.teacher.create({ data })
  }
}
