import mongoose from "mongoose";

export interface UserInterface{
    _id: mongoose.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username wajib diisi'],
        unique: [true, 'username harus unik'],
    },
    password: {
        type: String,
        required: [true, 'password harus diisi']
    },
    email: {
        type: String,
        required: [true, 'email wajib diisi'], 
        unique: [true, "email sudah digunakan"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    }
}, {
    timestamps: true
})

const User = mongoose.model<UserInterface>('User', userShema);

export default User;