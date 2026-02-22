import { Request, Response } from 'express';
import { asyncHandler } from '../../util/asyncHandler';
import * as authService from './authService';
import { loginRequest, registrationRequest } from './authDto';
import { successResponse } from '../../util/response';

export const registration = asyncHandler(async (req: Request <{}, {}, registrationRequest>, res: Response) => {
    const {username, email, password} = req.body;
    await authService.registration(username, password, email);
    res.status(201).json(successResponse('Berhasil melakukan registrasi'));
})

export const login = asyncHandler(async (req: Request<{}, {},loginRequest>, res: Response )=> {
    const {username, password} = req.body;
    const {login, refreshToken, accessToken} = await authService.login(username, password);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'prod'
    });
    res.status(200).json(successResponse('Berhasil login', {login, accessToken}));
})

export const refresh = asyncHandler(async(req: Request, res: Response,)=> {
    const oldRefreshToken = req.cookies.refreshToken;
    const {refreshToken, accessToken} = await authService.refresh(oldRefreshToken);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict'
    });
    res.status(200).json(successResponse('Berhasil memperoleh token', accessToken));
})

export const logout = asyncHandler(async(req: Request, res: Response)=> {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken){
        authService.logout(refreshToken);
    };
    res.clearCookie('refreshToken');
    res.status(204).end();
})
export const admin = asyncHandler(async(req: Request, res: Response)=> {
    const result = await authService.makeAdmin();
    res.status(201).json(successResponse('Berhasil membuat admin', result));
})