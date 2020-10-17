import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'

export default {
  async create (req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours: openingHours,
      open_on_weekends: openOnWeekends
    } = req.body
    const reqImages = req.files as Express.Multer.File[]
    const images = reqImages.map((item) => ({ path: item.filename }))
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours: openingHours,
      open_on_weekends: openOnWeekends === 'true',
      images
    }
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanageRepository = getRepository(Orphanage)
    const orphanage = orphanageRepository.create(data)

    await orphanageRepository.save(orphanage)

    return res.status(201).json(orphanage)
  },

  async read (req: Request, res: Response) {
    const { id } = req.params
    const orphanageRepository = getRepository(Orphanage)
    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return res.json(orphanageView.render(orphanage))
  },

  async list (req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage)
    const orphanages = await orphanageRepository.find({
      relations: ['images']
    })

    return res.json(orphanageView.renderMany(orphanages))
  }
}
