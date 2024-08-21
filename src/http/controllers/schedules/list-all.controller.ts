import { makeListAllSchedulesUseCase } from '@/utils/factories/make-list-all-schedules-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listAllSchedules(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listAllSchedulesUseCase = makeListAllSchedulesUseCase()

  try {
    const schedules = await listAllSchedulesUseCase.execute()
    reply.status(200).send(schedules)
  } catch (error) {
    reply.status(500).send({ error: (error as Error).message })
  }
}
