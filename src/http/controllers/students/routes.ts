import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { listAllStudents } from './list-all.controller'

export async function studentsRoutes(app: FastifyInstance) {
  app.post('/student', create)
  app.get('/students', listAllStudents)
}
