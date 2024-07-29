import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function studentsRoutes(app: FastifyInstance) {
  app.post('/student', create)
}
