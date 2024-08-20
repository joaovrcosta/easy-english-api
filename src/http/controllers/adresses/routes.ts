import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function addressRoutes(app: FastifyInstance) {
  app.post('/address', create)
}
