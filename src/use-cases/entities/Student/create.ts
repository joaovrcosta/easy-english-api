import { AddressRepository } from '@/repositories/adresses-repository'
import { StudentRepository } from '@/repositories/students-repository'
import { InvalidCPFFormat } from '@/utils/errors/students/invalidCPFformat.error'
import { InvalidRGFormat } from '@/utils/errors/students/invalidRGFormat.error'
import { Student, Address } from '@prisma/client'

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
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

interface CreateUseCaseResponse {
  student: Student
  address: Address
}

export class CreateStudent {
  constructor(
    private studentRepository: StudentRepository,
    private addressRepository: AddressRepository
  ) {}

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
    address,
  }: CreateUseCaseProps): Promise<CreateUseCaseResponse> {
    if (!this.isValidCPF(cpf)) {
      throw new InvalidCPFFormat()
    }

    if (!this.isValidRG(rg)) {
      throw new InvalidRGFormat()
    }

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

    console.log(student)

    let createdAddress: Address
    if (address) {
      createdAddress = await this.addressRepository.create({
        ...address,
        studentId: student.id,
      })
    } else {
      createdAddress = {
        id: 0,
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        studentId: student.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        guardianId: null,
      }
    }

    console.log(createdAddress)

    return { student, address: createdAddress }
  }
}
