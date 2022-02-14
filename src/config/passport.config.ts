import passport from 'passport'
import passportLocal from'passport-local'
import bcrypt from 'bcrypt'
import passportJwt from 'passport-jwt'
import student from '../models/student'
import dotenv from 'dotenv'

dotenv.config()


const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const secretOrKey = process.env.ACCESS_TOKEN_SECRET

passport.use(new LocalStrategy(
  async (email: String, password: string | Buffer, done: any) => {
      const user = await student.findOne({email})
      console.log(user)
    if  (!user[0] ) {
        console.log("User not found!")
        return done(null, false)
    }
    else if(!await bcrypt.compare(password, user[0].password)){
        console.log("Incorrect password!")
         return done(null,false)
    }
    else{
        console.log("Logged in!")
        return done(null, user)
    }
  }
))

passport.use(new JwtStrategy({
  secretOrKey,
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token:any, done: any) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));