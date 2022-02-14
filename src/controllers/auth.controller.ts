import passport from "passport"
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwt = jsonwebtoken

const login = async (req:any, res:any, next:any) => {
  passport.authenticate('local', async (err:any, user:any) => {   
    console.log(err)
     try {
      if(err || !user){
        const error = new Error("User not found")
        return next(error);
      }
      req.login(user, { session : false }, async (error:any) => {
        if( error ) return next(error)
        const body = { username : user[0].username, email : user[0].email };
        const token = jwt.sign({ user : body }, process.env.ACCESS_TOKEN_SECRET || "")
        return res.json({ token });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
}


export { login}
