import jwt, {JwtPayload} from 'jsonwebtoken';

export interface AccessTokenPayload extends JwtPayload{
    username: string;
    role: string;
};

export interface RefreshTokenPayload extends JwtPayload{
    username: string;
};

export const generateAccessToken = (username: string, role: string): string => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error('JWT_ACCESS_SECRET tidak ada');
    return jwt.sign({username, role}, secret, {
        'expiresIn': '1h'
    });
};

export const generateRefreshToken = (username: string) => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET tidak ada');
    return jwt.sign({username}, secret, {
        'expiresIn': '15h'
    });
};

export const validateAccessToken = (token: string): AccessTokenPayload => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error('JWT_ACCESS_SECRET tidak ada');
    return jwt.verify(token, secret) as AccessTokenPayload;
};

export const validateRefreshToken = (token: string): RefreshTokenPayload => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET tidak ada');
    return jwt.verify(token, secret) as RefreshTokenPayload;
}