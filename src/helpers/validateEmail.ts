import User from '../models/user.model';

const validateEmail = async (email: String) => {
  try {
    const emailFound = await User.find({ email });
    if (!emailFound) return true;
    else return false;
  } catch (err) {
    console.error(err);
  }
};

export default validateEmail;
