import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import nodeRoutes from './routes/node.routes'
import connectionRoutes from './routes/connection.routes'
import tryCatch from './utils/tryCatch'
import caseConvert from './middlewares/caseConvert.middleware'

@tryCatch
export default class {
  private app: Application = express()

  constructor() {
    dotenv.config()
    this.middlewares()
    this.routes()
  }

  public async start(port: string = process.env.PORT || '3000') {
    this.app.listen(port)
    console.log(`Server running on port ${port}`)
  }

  private middlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(caseConvert)
  }

  private routes() {
    this.app.use('/api/v1', nodeRoutes)
    this.app.use('/api/v1', connectionRoutes)
  }
}
