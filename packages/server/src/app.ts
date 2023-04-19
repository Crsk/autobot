import express, { Application, Router } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import caseConvert from './middlewares/caseConvert.middleware'
import { nodeRoutes } from './routes/node/node.routes'

dotenv.config()

const app: Application = express()
const router: Router = Router()
const baseUrl = '/api/v1'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use(caseConvert)
nodeRoutes(app, router, baseUrl)

export default app
