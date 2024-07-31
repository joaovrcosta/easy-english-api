import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function contractsRoutes(app: FastifyInstance) {
  app.post('/new-contract', create)
}
