import path from 'path'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import './database/connection'
import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(3333, () => {
  console.info('[SERVER] http listening on 3333')
})
