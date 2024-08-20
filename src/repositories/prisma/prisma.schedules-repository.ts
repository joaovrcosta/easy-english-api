import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ScheduleRepository } from '../schedules-repository'

export class PrismaSchedulesRepository implements ScheduleRepository {
  async create(data: Prisma.ScheduleUncheckedCreateInput) {
    return await prisma.schedule.create({ data })
  }

  async listAll() {
    return await prisma.schedule.findMany()
  }
}
