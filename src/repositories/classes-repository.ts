import { Course, Prisma } from '@prisma/client'

export interface ClassesRepository {
  create(data: Prisma.CourseUncheckedCreateInput): Promise<Course>
}
