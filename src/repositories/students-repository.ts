import { Student, Prisma, Address } from '@prisma/client'

export interface StudentRepository {
  create(studentData: Prisma.StudentUncheckedCreateInput): Promise<Student>
  createWithAddress(
    studentData: Prisma.StudentUncheckedCreateInput,
    addressData?: Prisma.AddressUncheckedCreateInput
  ): Promise<{ student: Student; address?: Address }>
}
