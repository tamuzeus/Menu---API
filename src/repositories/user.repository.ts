import { hashPassword } from '../Utils/bcrypt.password.util';
import { UserModel } from '../models/user.model';

async function createUserRepository(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  const userWithHashedPassword = {
    email: email,
    password: hashedPassword,
  };
  return UserModel.create(userWithHashedPassword);
}


export const UserRepository = {
  createUserRepository
};
