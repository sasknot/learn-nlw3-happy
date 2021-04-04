import path from 'path'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import './database/connection'
import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.set('port', process.env.API_PORT || 3333)
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(app.get('port'), () => {
  console.info(`[SERVER] http listening on ${app.get('port')}`)
})
