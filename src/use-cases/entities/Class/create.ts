import { ClassesRepository } from '@/repositories/classes-repository'
import { Course } from '@prisma/client'

interface CreateClassUseCaseProps {
  name: string
  acronym: string
  valuePerHour: number
  category: string
  language: string
  available: boolean
  avaliation: number
  teacherId?: number | null
}

interface CreateClassUseCaseResponse {
  course: Course
}

export class CreateClass {
  constructor(private classRepository: ClassesRepository) {}

  async execute({
    name,
    acronym,
    valuePerHour,
    category,
    language,
    available,
    avaliation,
    teacherId,
  }: CreateClassUseCaseProps): Promise<CreateClassUseCaseResponse> {
    const course = await this.classRepository.create({
      name,
      acronym,
      valuePerHour,
      category,
      language,
      available,
      avaliation,
      teacherId,
    })

    return { course }
  }
}
