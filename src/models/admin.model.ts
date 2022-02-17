import mongoose from 'mongoose';
import User from './user.model';

const Admin = User.discriminator(
  'Admin',
  new mongoose.Schema({
    // admin props here
  }),
);

export default Admin;
