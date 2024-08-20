import { ScheduleRepository } from '@/repositories/schedules-repository'
import { Schedule, DayOfWeek } from '@prisma/client'

interface CreateScheduleUseCaseProps {
  teacherId: number
  dayOfWeek: string[]
  courseId: number
  startTime: Date | string
  endTime: Date | string
}

interface CreateScheduleUseCaseResponse {
  schedule: Schedule
}

export class CreateSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute({
    teacherId,
    dayOfWeek,
    courseId,
    startTime,
    endTime,
  }: CreateScheduleUseCaseProps): Promise<CreateScheduleUseCaseResponse> {
    const dayOfWeekEnum = dayOfWeek.map(
      (day) => DayOfWeek[day as keyof typeof DayOfWeek]
    )

    const schedule = await this.scheduleRepository.create({
      teacherId,
      courseId,
      dayOfWeek: { set: dayOfWeekEnum },
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    })

    return { schedule }
  }
}
