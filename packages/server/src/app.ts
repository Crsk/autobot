import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import nodeRoutes from './routes/node.routes'
import connectionRoutes from './routes/connection.routes'
import caseConvert from './middlewares/caseConvert.middleware'

dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use(caseConvert)

app.use('/api/v1', nodeRoutes)
app.use('/api/v1', connectionRoutes)

export default app
