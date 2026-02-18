import bcrypt from 'bcrypt';
import { createUser, getUserByEmail, getUserByUsername } from '../user/userRepository';
import AppError from '../../util/appError';

const SALT_ROUNDS = 10
export const registration = async (username: string, password: string, email: string) => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const [checkUsername, checkEmail] = await Promise.all([getUserByUsername(username), getUserByEmail(email)]);
    if (checkUsername || checkEmail) throw new AppError('Username atau email sudah digunakan', 400);
    const data = {username, password:passwordHash, email};
    const user = await createUser(data);
    return user;
}