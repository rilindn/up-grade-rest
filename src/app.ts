import express, { Application, Router } from 'express';
import cors from 'cors';
import mongoDbConfig from './config/mongodb.config';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import router from './routes';
import "./config/passport.config"

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();
// connect to mongo
mongoDbConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser())
app.use(session({
  secret: 'key that will sign cookie',
  resave: false,
  saveUninitialized: false,
}))                       

app.use(passport.initialize())   
app.use(passport.session())   
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

export default app;
