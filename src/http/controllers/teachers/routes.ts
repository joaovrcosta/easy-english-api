import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function teachersRoutes(app: FastifyInstance) {
  app.post('/new-teacher', create)
}
