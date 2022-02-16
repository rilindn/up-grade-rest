import express from 'express';
import studentRoutes from './student.route';
import classRoutes from './class.route';
import passport from 'passport';
import { loggedUser } from '../../controllers/auth.controller';

const router = express.Router();

// get logged user saved in session
router.get('/loggedUser', passport.authenticate('jwt', { session: false }), loggedUser);

router.use('/student', studentRoutes);
router.use('/class', classRoutes);

export default router;
