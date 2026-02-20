import bcrypt from 'bcrypt';
import { createUser, getUserByEmail, getUserByUsername } from '../user/userRepository';
import AppError from '../../util/appError';
import { generateAccessToken, generateRefreshToken } from '../../util/jwt';
import crypto from 'crypto';
import { createRefreshToken } from './refreshToken/refreshTokenRepository';
import { loginResponse } from './authDto';

const SALT_ROUNDS = 10
export const registration = async (username: string, password: string, email: string) => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const [checkUsername, checkEmail] = await Promise.all([getUserByUsername(username), getUserByEmail(email)]);
    if (checkUsername || checkEmail) throw new AppError('Username atau email sudah digunakan', 400);
    const data = {username, password:passwordHash, email};
    await createUser(data);
}

export const login = async (username: string, password: string): Promise<loginResponse> => {
    const user = await getUserByUsername(username);
    if (!user) throw new AppError('Username atau password salah', 404);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new AppError('Username atau password salah', 404);
    const accessToken = generateAccessToken(user.username, user.role);
    const refreshToken = generateRefreshToken(user.username);
    await createRefreshToken({userId: user._id, tokenHash: generateTokenHash(refreshToken), expiredAt: new Date(Date.now() + 15*60*60*1000)});
    return {
        login: true,
        refreshToken,
        accessToken
    };

}

const generateTokenHash = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex');
}