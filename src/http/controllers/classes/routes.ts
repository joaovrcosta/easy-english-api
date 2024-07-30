import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function classesRoutes(app: FastifyInstance) {
  app.post('/new-class', create)
}
