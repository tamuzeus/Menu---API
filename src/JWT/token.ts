import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function createJwtToken(userId: string): string {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
}
