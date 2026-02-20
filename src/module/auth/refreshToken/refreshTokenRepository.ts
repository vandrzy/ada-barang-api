import { Types } from "mongoose";
import RefreshToken, {RefreshTokenInterface} from "./refreshTokenModel";

export const createRefreshToken = async (data: {userId: Types.ObjectId, tokenHash: string, expiredAt: Date}): Promise<RefreshTokenInterface> =>{
    return await RefreshToken.create(data);
}