import { hashPassword, comparePassword } from '../Utils/bcrypt.password.util';
import { UserModel, User } from '../models/user.model';

async function createUserRepository(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  const userWithHashedPassword = {
    email: email,
    password: hashedPassword,
  };
  return UserModel.create(userWithHashedPassword);
}

async function loginUserRepository(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect email or password');
  }
  return user;
}


export const UserRepository = {
  createUserRepository, loginUserRepository
};
