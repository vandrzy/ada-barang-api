import multer, { FileFilterCallback } from 'multer';
import AppError from '../util/appError';
import { Request } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }else{
        cb(new AppError('File harus berupa gambar', 400));
    }
};

export const upload = multer({
    storage, 
    fileFilter,
    limits: {
        fileSize: 5*1024*1024
    }
});