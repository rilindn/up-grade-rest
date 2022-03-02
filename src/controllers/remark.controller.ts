import Remark from '../models/remark.model'
import { Request, Response } from 'express'
import { registerSchema, updateSchema } from '../validators/remark.validation'

const getAllRemarks = async (req: Request, res: Response) => {
    try {
      const remarks = await Remark.find()
      return res.send(remarks)
    } catch (error) {
      return res.status(500).send(error)
    }
}

const getRemarksById = async (req: Request, res: Response) => {
    try {
      const remark = await Remark.find({ _id: req.params.id })
      return res.send(remark)
    } catch (error) {
      return res.status(500).send(error)
    }
}

const registerRemark = async (req: Request, res: Response) => {
    const validationResult = registerSchema.validate({ ...req.body })
  
    if (validationResult.error) {
      const errorMsg = validationResult.error.details[0].message
      return res.status(400).json({ error: errorMsg })
    }
    const newRemark = new Remark({ ...req.body })
    try {
      await newRemark.save()
      return res.send(newRemark)
    } catch (error) {
      return res.status(500).send(error)
    }
}

const updateRemark = async (req: Request, res: Response) => {
    const remarkId = req.params.id
    const validationResult = updateSchema.validate({ ...req.body, remarkId })
    if (validationResult.error) {
      const errorMsg = validationResult.error
      return res.status(400).json({ error: errorMsg })
    }
  
    const updatedRemark = await Remark.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false })
    if (!updatedRemark) res.status(404).send('Remark not found!')
    try {
      await updatedRemark.save()
      res.send(updatedRemark)
    } catch (error) {
      res.status(500).send(error)
    }
}


const deleteRemark = async (req: Request, res: Response) => {
    try {
      const deletedRemark = await Remark.findByIdAndDelete(req.params.id)
      if (!deletedRemark) res.status(404).send('Remark not found!')
      res.status(200).send(deletedRemark)
    } catch (error) {
      res.status(500).send(error)
    }
  }
  
  export default { getAllRemarks, getRemarksById, registerRemark, updateRemark, deleteRemark }