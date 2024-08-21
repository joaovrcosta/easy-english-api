import { FastifyInstance } from 'fastify'
import { listAllInvoices } from './list-all.controller'

export async function invoicesRoutes(app: FastifyInstance) {
  app.get(
    '/invoices',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            year: { type: 'number', minimum: 2000, maximum: 2100 },
            month: { type: 'number', minimum: 1, maximum: 12 },
            status: { type: 'string', enum: ['PAID', 'UNPAID', 'PENDING'] },
            take: { type: 'number', default: 30 },
            skip: { type: 'number', default: 0 },
          },
          additionalProperties: false,
        },
      },
    },
    listAllInvoices
  )
}
