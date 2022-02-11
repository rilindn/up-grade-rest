import StudentModel from '../models/student';
import { Request, Response, NextFunction } from 'express';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.find();
    return res.json(students);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const newUser = new StudentModel(req.body);
    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default { getAllStudents, createStudent };
