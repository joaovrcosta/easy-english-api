import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { studentsRoutes } from './http/controllers/students/routes'
import { addressRoutes } from './http/controllers/adresses/routes'
import { teachersRoutes } from './http/controllers/teachers/routes'
import { classesRoutes } from './http/controllers/classes/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(studentsRoutes)
app.register(addressRoutes)
app.register(teachersRoutes)
app.register(classesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
  }

  return reply.status(500).send({ message: 'internal server error' })
})
