import { StudentRepository } from '@/repositories/students-repository'
import { Student } from '@prisma/client'

interface ListAllStudentsResponse {
  students: Student[]
}

export class ListAllStudentsUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<ListAllStudentsResponse> {
    const students = await this.studentRepository.listAll()
    return { students }
  }
}
