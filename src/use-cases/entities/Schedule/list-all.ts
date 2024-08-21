import { ScheduleRepository } from '@/repositories/schedules-repository'
import { Schedule } from '@prisma/client'

interface ListAllSchedulesResponse {
  schedules: Schedule[]
}

export class ListAllScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(): Promise<ListAllSchedulesResponse> {
    const schedules = await this.scheduleRepository.listAll()
    return { schedules }
  }
}
