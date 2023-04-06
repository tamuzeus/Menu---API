import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/signUp', UserController.createUser);

export default userRouter;
