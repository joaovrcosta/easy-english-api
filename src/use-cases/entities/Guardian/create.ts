import { GuardianRepository } from '@/repositories/guardian-repository'
import { Guardian } from '@prisma/client'

interface CreateGuardianUseCaseProps {
  name: string
  email: string
  cpf: string
  phone: string
  relationship: string
}

interface CreateGuardianUseCaseResponse {
  guardian: Guardian
}

export class CreateGuardian {
  constructor(private guardianRepository: GuardianRepository) {}

  async execute({
    name,
    email,
    relationship,
    phone,
  }: CreateGuardianUseCaseProps): Promise<CreateGuardianUseCaseResponse> {
    const guardian = await this.guardianRepository.create({
      name,
      email,
      relationship: 'parent',
      phone,
    })

    return { guardian }
  }
}
