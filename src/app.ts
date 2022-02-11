import express, { Application, Router } from 'express';
import cors from 'cors';
import mongoDbConfig from './config/mongodb.config';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();
// connect to mongo
mongoDbConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
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
