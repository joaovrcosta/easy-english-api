import { Prisma, Teacher } from '@prisma/client'

export interface TeacherRepository {
  create(data: Prisma.TeacherUncheckedCreateInput): Promise<Teacher>
}
