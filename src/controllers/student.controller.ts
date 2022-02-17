import { Request, Response } from 'express';
import { generateStudentId, generateStudentEmail } from '../services/student.service';
import { studentRegister, studentUpdate } from './../validators/student.validation';
import Student from '../models/student.model';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    return res.send(students);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.find({ _id: req.params.id });
    return res.send(student);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const registerStudent = async (req: Request, res: Response) => {
  const studentId = await generateStudentId();
  const email = generateStudentEmail(studentId, req.body);
  const password = '12345678';

  const validationResult = studentRegister.validate({ ...req.body, studentId, email, password });

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message;
    return res.status(400).json({ error: errorMsg });
  }

  const newUser = new Student({ ...req.body, studentId, email, password });
  try {
    await newUser.save();
    return res.send(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const validationResult = studentUpdate.validate({ ...req.body, userId });

  if (validationResult.error) {
    const errorMsg = validationResult.error;
    return res.status(400).json({ error: errorMsg });
  }
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
    if (!updatedStudent) return res.status(404).send('User not found!');
    return res.send(updatedStudent);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) res.status(404).send('User not found!');
    res.status(200).send(deletedStudent);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getAllStudents, getStudentById, registerStudent, updateStudent, deleteStudent };
