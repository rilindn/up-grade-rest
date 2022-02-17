import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();
const jwt = jsonwebtoken;

const login = async (req: any, res: any, next: any) => {
  passport.authenticate('local', async (err: any, user: any) => {
    try {
      if (err || !user) {
        const error = new Error('Invalid login data!');
        return next(error);
      }
      req.login(user, { session: false }, async (error: any) => {
        if (error) return next(error);
        const body = { userID: user?._id };
        const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET || '');
        return res.json({ token, user: req.user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const loggedUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.userID);
    res.send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = (req: any, res: any) => {
  try {
    req.logout();
    res.send('Logged out succesfully!');
  } catch (error) {
    res.status(500).send(error);
  }
};

export { login, loggedUser, logout };