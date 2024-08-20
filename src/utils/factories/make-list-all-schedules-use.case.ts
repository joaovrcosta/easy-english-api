import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma.schedules-repository'
import { ListAllScheduleUseCase } from '@/use-cases/entities/Schedule/list-all'

export function makeListAllSchedulesUseCase() {
  const scheduleRepository = new PrismaSchedulesRepository()
  const useCase = new ListAllScheduleUseCase(scheduleRepository)

  return useCase
}
