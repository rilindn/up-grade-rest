import User from '../models/user';
import { Request, Response } from 'express';
import { generateStudentId, generateStudentEmail } from '../services/student.service';
import { registerSchema, updateSchema } from './../validators/student.validation';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find();
    return res.send(students);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await User.find({ _id: req.params.id });
    return res.send(student);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const registerStudent = async (req: Request, res: Response) => {
  const studentId = await generateStudentId();
  const email = await generateStudentEmail(studentId, req.body);

  const validationResult = registerSchema.validate({ ...req.body, studentId, email });

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message;
    return res.status(400).json({ error: errorMsg });
  }

  const newUser = new User({ ...req.body, studentId, email });
  try {
    await newUser.save();
    return res.send(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const validationResult = updateSchema.validate({ ...req.body, userId });

  if (validationResult.error) {
    const errorMsg = validationResult.error;
    return res.status(400).json({ error: errorMsg });
  }

  const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
  if (!updatedStudent) res.status(404).send('User not found!');
  try {
    await updatedStudent.save();
    res.send(updatedStudent);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await User.findByIdAndDelete(req.params.id);
    if (!deletedStudent) res.status(404).send('User not found!');
    res.status(200).send(deletedStudent);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getAllStudents, getStudentById, registerStudent, updateStudent, deleteStudent };
