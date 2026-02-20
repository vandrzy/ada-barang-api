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