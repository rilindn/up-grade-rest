import express from 'express';
import { loggedUser, login } from '../../controllers/auth.controller';

const authRoute = express.Router();

authRoute.post('/login', login);

authRoute.get('/loggedUser', loggedUser);

export default authRoute;
