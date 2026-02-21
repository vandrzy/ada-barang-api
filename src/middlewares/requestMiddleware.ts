import { ZodObject, ZodRawShape } from "zod";
import {Request, Response, NextFunction, RequestHandler} from 'express';
import AppError from "../util/appError";

export const validateBody = <T extends ZodRawShape>(schema: ZodObject<T>): RequestHandler => 
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success){
            console.error({
                message: result.error.message,
                stack: result.error.stack,
                name: result.error.name
            });
            return next(new AppError('Request buruk', 400));
        };
        req.body =result.data;
        next();
    }
    

export const validateQuery = <T extends ZodRawShape>(schema: ZodObject<T>): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if(!result.success){
        console.error({
            message: result.error.message,
            stack: result.error.stack,
            name: result.error.name
        });
        return next(new AppError('Request buruk', 400));
    };

    req.validatedQuery = result.data;
    next();
}    