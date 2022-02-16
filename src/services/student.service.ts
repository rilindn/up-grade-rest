import User from '../models/user';

const INITIAL_USER_ID = 100200300;

interface StudentDTO {
  firstName: String;
  lastName: String;
}

export const generateStudentId = async () => {
  const lastStudent = await User.find()?.sort({ _id: -1 })?.limit(1);
  let studentId = lastStudent?.[0]?.studentId || INITIAL_USER_ID;
  return ++studentId;
};

export const generateStudentEmail = async (id: Number, data: StudentDTO) => {
  const trimedId = id?.toString()?.slice(-4);
  const nameInitials = data?.firstName?.charAt(0) + data?.lastName?.charAt(0);
  const resultEmail = `${nameInitials.toLowerCase()}${trimedId}@upgrade.edu`;
  return resultEmail;
};
