import { UserModel } from '../models/user.model'
import createJwtToken from '../JWT/token';
import { UserRepository } from '../repositories/user.repository';
import { userSchema } from '../schemas/user.schema';

async function createUserService(email: string, password: string) {
    const { error } = userSchema.validate({ email, password });

    if (error) {
        throw new Error(error.message);
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new Error('This email is already registered');
    }

    const newUser = await UserRepository.createUserRepository(email, password);
    const token = createJwtToken(newUser._id.toString());
    return token;
}

async function createLoginService(email: string, password: string) {
    const { error } = userSchema.validate({ email, password });

    if (error) {
        throw new Error(error.message);
    }
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
        throw new Error('Email not registered');
    }

    const newUser = await UserRepository.loginUserRepository(email, password);
    const token = createJwtToken(newUser._id.toString());
    console.log(newUser)
    return token;
}


export const UserService = {
    createUserService,
    createLoginService
};
