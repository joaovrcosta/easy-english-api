import { StudentRepository } from '@/repositories/students-repository'
import { InvalidCPFFormat } from '@/utils/errors/students/invalidCPFformat.error'
import { InvalidRGFormat } from '@/utils/errors/students/invalidRGFormat.error'
import { Student } from '@prisma/client'

interface CreateUseCaseProps {
  name: string
  email: string
  phone: string
  birthDay: Date
  civil_state: string
  religion: string
  cpf: string
  rg: string
  nationality: string
  sex: string
}

interface CreateUseCaseResponse {
  student: Student
}

export class CreateStudent {
  constructor(private studentRepository: StudentRepository) {}

  private isValidCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, '')
    return /^[0-9]{11}$/.test(cleanedCPF)
  }

  private isValidRG(rg: string): boolean {
    const cleanedRG = rg.replace(/\D/g, '')
    return /^[0-9]{9}$/.test(cleanedRG)
  }

  async execute({
    name,
    email,
    phone,
    birthDay,
    civil_state,
    religion,
    cpf,
    rg,
    nationality,
    sex,
  }: CreateUseCaseProps): Promise<CreateUseCaseResponse> {
    if (!this.isValidCPF(cpf)) {
      throw new InvalidCPFFormat()
    }

    if (!this.isValidRG(rg)) {
      throw new InvalidRGFormat()
    }

    // Criação do estudante no repositório
    const student = await this.studentRepository.create({
      name,
      email,
      phone,
      birthDay,
      civil_state,
      religion,
      cpf,
      rg,
      nationality,
      sex,
      active: true,
    })

    return { student }
  }
}
