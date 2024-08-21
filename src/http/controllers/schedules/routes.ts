import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { listAllSchedules } from './list-all.controller'

export async function schedulesRoutes(app: FastifyInstance) {
  app.post('/new-schedule', create)
  app.get('/schedules', listAllSchedules)
}
