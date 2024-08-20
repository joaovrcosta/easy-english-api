import { ClassesRepository } from '@/repositories/classes-repository'
import { Course } from '@prisma/client'

interface ListAllClassesResponse {
  classes: Course[]
}

export class ListAllClassesUseCase {
  constructor(private classRepository: ClassesRepository) {}

  async execute(): Promise<ListAllClassesResponse> {
    const classes = await this.classRepository.listAll()
    return { classes }
  }
}
