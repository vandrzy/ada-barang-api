import mongoose from "mongoose";

export interface RefreshTokenInterface{
    userId: mongoose.Types.ObjectId;
    tokenHash: string;
    expiredAt: Date;
    revokedAt?: Date;
    replacedByToken?: string;
};

const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tokenHash: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    },
    revokedAt: Date,
    replacedByToken: String
})

const RefreshToken = mongoose.model<RefreshTokenInterface>('RefreshToken', refreshTokenSchema);
export default RefreshToken;