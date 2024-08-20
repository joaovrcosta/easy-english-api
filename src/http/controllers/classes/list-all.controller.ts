import { makeListAllClassesUseCase } from '@/utils/factories/make-list-all-classes-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listAllClasses(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const listAllClassesUseCase = makeListAllClassesUseCase()

  try {
    const classes = await listAllClassesUseCase.execute()
    res.status(200).send(classes)
  } catch (error) {
    res.status(500).send({ error: (error as Error).message })
  }
}
