import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ClassesRepository } from '../classes-repository'

export class PrismaClassRepository implements ClassesRepository {
  async create(data: Prisma.CourseUncheckedCreateInput) {
    return await prisma.course.create({ data })
  }
}
