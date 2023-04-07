import { Request, Response } from 'express';
import { UserService } from '../services/user.services';

async function createUser(req: Request, res: Response) {

  const { email, password } = req.body;

  try {
    const token = await UserService.createUserService(email, password);
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

async function createLogin(req: Request, res: Response) {

  const { email, password } = req.body;

  try {
    const token = await UserService.createLoginService(email, password);
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


export const UserController = {
  createUser, createLogin
};
