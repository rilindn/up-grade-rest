import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportJwt from 'passport-jwt';
import student from '../models/student';
import dotenv from 'dotenv';
import User from '../models/student';

dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const secretOrKey = process.env.ACCESS_TOKEN_SECRET;

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(
  new LocalStrategy(authFields, async (email: String, password: string | Buffer, done: any) => {
    const user = await student.findOne({ email });
    if (!user) {
      console.log('User not found!');
      return done(null, false);
    } else if (!(await bcrypt.compare(password, user.password))) {
      console.log('Incorrect password!');
      return done(null, false);
    } else {
      console.log('Logged in!');
      return done(null, user);
    }
  }),
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: any) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.serializeUser(function (user: any, done) {
  console.log('serializeUser', user);
  done(null, user?._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err: any, user: any) {
    console.log('deserializeUser', user);
    done(err, user);
  });
});
