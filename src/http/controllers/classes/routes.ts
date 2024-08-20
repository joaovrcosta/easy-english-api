import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { listAllClasses } from './list-all.controller'

export async function classesRoutes(app: FastifyInstance) {
  app.post('/classes', create)
  app.get('/classes', listAllClasses)
}
