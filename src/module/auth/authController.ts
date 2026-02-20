import { Request, Response } from 'express';
import { asyncHandler } from '../../util/asyncHandler';
import * as authService from './authService';
import { registrationRequest } from './authDto';
import { successResponse } from '../../util/response';

export const registration = asyncHandler(async (req: Request <{}, {}, registrationRequest>, res: Response) => {
    const {username, email, password} = req.body;
    await authService.registration(username, password, email);
    res.status(201).json(successResponse('Berhasil melakukan registrasi'));
})