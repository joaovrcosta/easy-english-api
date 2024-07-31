import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma.schedules-repository'
import { CreateSchedule } from '@/use-cases/entities/Schedule/create'

export function makeCreateScheduleUseCase() {
  const scheduleRepository = new PrismaSchedulesRepository()
  const useCase = new CreateSchedule(scheduleRepository)

  return useCase
}
