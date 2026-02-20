import { Types } from "mongoose";
import RefreshToken, {RefreshTokenInterface} from "./refreshTokenModel";
import { findRefreshTokenDto } from "./refreshTokenDto";

export const createRefreshToken = async (data: {userId: Types.ObjectId, tokenHash: string, expiredAt: Date}) =>{
    await RefreshToken.create(data);
}

export const findRefreshToken = async (token: string): Promise<findRefreshTokenDto|null> => {
    return await RefreshToken.findOne({tokenHash: token}).populate({path: 'userId', select: 'username'}).lean<findRefreshTokenDto>()
}

export const usedToken = async (tokenHash:string, revokedAt: Date, replacedByToken?: string) => {
    await RefreshToken.findOneAndUpdate({tokenHash}, {revokedAt, replacedByToken})
}