import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwt = jsonwebtoken;

const login = async (req: any, res: any, next: any) => {
  passport.authenticate('local', async (err: any, user: any) => {
    try {
      if (err || !user) {
        const error = new Error('User not found');
        return next(error);
      }
      req.login(user, { session: false }, async (error: any) => {
        if (error) return next(error);
        const body = { username: user.firstName, email: user.email };
        const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET || '');
        console.log(' req.user', req.user);
        return res.json({ token, user: req.user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const loggedUser = async (req: any, res: any, next: any) => {
  res.send(req.user);
};

export { login, loggedUser };
