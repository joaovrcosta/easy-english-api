import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { GuardianRepository } from '../guardian-repository'

export class PrismaGuardiasRepository implements GuardianRepository {
  async create(data: Prisma.GuardianUncheckedCreateInput) {
    return await prisma.guardian.create({ data })
  }

  async linkStudentToGuardian(
    studentId: number,
    guardianId: number
  ): Promise<void> {
    await prisma.studentGuardian.create({
      data: {
        studentId,
        guardianId,
      },
    })
  }
}
