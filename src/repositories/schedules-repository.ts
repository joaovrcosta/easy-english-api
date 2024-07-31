import { Prisma, Schedule } from '@prisma/client'

export interface ScheduleRepository {
  create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule>
}
