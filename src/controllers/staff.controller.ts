import { Request, Response } from 'express';
import { generateStaffEmail } from '../services/staff.service';
import { staffRegister, staffUpdate } from '../validators/staff.validation';
import Staff from '../models/staff.model';

const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.find();
    return res.send(staff);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getStaffById = async (req: Request, res: Response) => {
  try {
    const user = await Staff.find({ _id: req.params.id });
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const registerStaff = async (req: Request, res: Response) => {
  const email = await generateStaffEmail(req.body);
  const password = '12345678';

  const validationResult = staffRegister.validate({ ...req.body, email, password });

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message;
    return res.status(400).json({ error: errorMsg });
  }

  const newUser = new Staff({ ...req.body, email, password });
  try {
    await newUser.save();
    return res.send(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateStaff = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const validationResult = staffUpdate.validate({ ...req.body, userId });

  if (validationResult.error) {
    const errorMsg = validationResult.error;
    return res.status(400).json({ error: errorMsg });
  }

  try {
    const updatedUser = await Staff.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
    if (!updatedUser) return res.status(404).send('User not found!');
    return res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStaff = async (req: Request, res: Response) => {
  try {
    const deletedUser = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedUser) res.status(404).send('User not found!');
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getAllStaff, getStaffById, registerStaff, updateStaff, deleteStaff };
