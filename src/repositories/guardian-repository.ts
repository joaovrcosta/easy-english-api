import { Guardian, Prisma } from '@prisma/client'

export interface GuardianRepository {
  create(data: Prisma.GuardianUncheckedCreateInput): Promise<Guardian>
  linkStudentToGuardian(studentId: number, guardianId: number): Promise<void>
}
