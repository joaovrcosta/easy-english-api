import { Student, Prisma, Address } from '@prisma/client'

export interface StudentRepository {
  create(studentData: Prisma.StudentUncheckedCreateInput): Promise<Student>
  listAll(): Promise<Student[]>
}
