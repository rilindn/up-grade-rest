import StudentModel from '../models/student';

interface StudentDTO {
  firstName: String;
  lastName: String;
}

export const generateStudentId = async () => {
  const lastStudent = await StudentModel.find().sort({ _id: -1 }).limit(1);
  let { studentId }: any = lastStudent[0];
  return ++studentId;
};

export const generateStudentEmail = async (id: Number, data: StudentDTO) => {
  const trimedId = id?.toString()?.slice(-4);
  const nameInitials = data?.firstName?.charAt(0) + data?.lastName?.charAt(0);
  const resultEmail = `${nameInitials.toLowerCase()}${trimedId}@upgrade.edu`;
  return resultEmail;
};
