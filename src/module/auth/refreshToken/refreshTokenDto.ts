import mongoose from "mongoose"

export interface findRefreshTokenDto {
    userId:{
        _id: mongoose.Types.ObjectId,
        username: string
    };
    tokenHash: string;
    expiredAt: Date;
    revokedAt?: Date;
    replacedByToken?: string;
}