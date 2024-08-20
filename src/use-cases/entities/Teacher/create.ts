import { TeacherRepository } from '@/repositories/teachers-repository'
import { Teacher } from '@prisma/client'

interface CreateTeacherUseCaseProps {
  name: string
  phone: string
  email: string
  birthDay: Date | string
}

interface CreateTeacherUseCaseResponse {
  teacher: Teacher
}

export class CreateTeacher {
  constructor(private teacherRepository: TeacherRepository) {}

  async execute({
    name,
    phone,
    email,
    birthDay,
  }: CreateTeacherUseCaseProps): Promise<CreateTeacherUseCaseResponse> {
    const teacher = await this.teacherRepository.create({
      name,
      phone,
      email,
      birthDay: new Date(birthDay),
    })

    return { teacher }
  }
}
