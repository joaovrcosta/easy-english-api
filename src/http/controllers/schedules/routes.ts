import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function schedulesRoutes(app: FastifyInstance) {
  app.post('/new-schedule', create)
}
