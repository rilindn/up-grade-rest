import mongoose, { ConnectOptions } from 'mongoose';
import User from '../models/user.model';
import Admin from '../models/admin.model';
import Student from '../models/student.model';
import Staff from '../models/staff.model';
import bcrypt from 'bcrypt';

const dbConnection = async () => {
  const mongoUrl = process.env.MONGO_URL! || `mongodb+srv://upGrade:li359rsWnXz0QWDY@upgrade.zrvwy.mongodb.net/upgrade-dev`;
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.info(`Connected to db: ${mongoose.connection.name}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const DEFAULT_PSW = '$2b$10$5I1iv9Yk2e108j3Ypz04Mee9yU1WawbzGFwdLffNtdLVlPEeTkz8W';

const seedAdmins = [
  {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@upgrade.edu',
    password: DEFAULT_PSW,
    dateOfBirth: '1990-02-17T16:51:36.472Z',
  },
  {
    firstName: 'SuperAdmin',
    lastName: 'SuperAdmin',
    email: 'superadmin@upgrade.edu',
    password: DEFAULT_PSW,
    dateOfBirth: '1990-02-17T16:51:36.472Z',
  },
];

const seedStudents = [
  {
    studentId: 100200400,
    firstName: 'Rilind',
    lastName: 'Nuha',
    email: 'rilind@upgrade.edu',
    password: DEFAULT_PSW,
    parent: 'Filan',
    dateOfBirth: '2000-02-17T16:51:36.472Z',
  },
  {
    studentId: 100200401,
    firstName: 'Rilinda',
    lastName: 'Xhaqkaj',
    email: 'rilinda@upgrade.edu',
    password: DEFAULT_PSW,
    parent: 'Filan',
    dateOfBirth: '2000-02-17T16:51:36.472Z',
  },
];

const seedStaff = [
  {
    firstName: 'Leonita',
    lastName: 'Fetahu',
    email: 'leonita@upgrade.edu',
    password: DEFAULT_PSW,
    dateOfBirth: '1990-02-17T16:51:36.472Z',
  },
  {
    firstName: 'Agnesa',
    lastName: 'Demolli',
    email: 'agnesa@upgrade.edu',
    password: DEFAULT_PSW,
    dateOfBirth: '1990-02-17T16:51:36.472Z',
  },
];

const seedDB = async () => {
  dbConnection();
  await User.deleteMany({});
  await Admin.insertMany(seedAdmins);
  await Student.insertMany(seedStudents);
  await Staff.insertMany(seedStaff);
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Seeding was successfully finished!');
});
