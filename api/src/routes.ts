import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.get('/orphanages/:id', OrphanagesController.read)
routes.get('/orphanages', OrphanagesController.list)

export default routes
