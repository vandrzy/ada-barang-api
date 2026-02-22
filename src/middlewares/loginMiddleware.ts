import e, { Request, Response, NextFunction } from "express";
import AppError from "../util/appError";
import { validateAccessToken } from "../util/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const authorization = req.headers.authorization;
    if (!authorization) throw new AppError('Belum login', 401);
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) throw new AppError('Belum login', 401);
    try {
        const user = validateAccessToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(new AppError('Waktu login telah habis', 401));
    }
}

export const authorizeMiddleware = (allowRole: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) throw new AppError('Belum login', 401);

    if (!allowRole.includes(req.user.role)) throw new AppError('Akses ditolak', 403);
    next();
}