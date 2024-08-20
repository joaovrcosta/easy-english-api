import { makeListAllStudentsUseCase } from '@/utils/factories/make-list-all-students-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listAllStudents(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const listAllStudentsUseCase = makeListAllStudentsUseCase()

  try {
    const students = await listAllStudentsUseCase.execute()
    res.status(200).send(students)
  } catch (error) {
    res.status(500).send({ error: (error as Error).message })
  }
}
