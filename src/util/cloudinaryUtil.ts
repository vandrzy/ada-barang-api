import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";
import AppError from "./appError";

export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {folder},
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse| undefined) => {
                if (error) {
                    return reject(error);
                }
                if (!result) {
                    return reject(new AppError('Upload gagal', 400));
                }
                resolve(result);
            }
        ).end(buffer);
    });
};

export const deleteFromCloudinary = (publicId: string): Promise<DeleteApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
            publicId,
            (error, result) => {
                if (error){
                    return reject(error);
                }
                resolve(result);
            }
        );
    });
};