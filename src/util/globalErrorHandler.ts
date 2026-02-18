import { ErrorRequestHandler } from "express";
import { failedResponse } from "./response";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        timestamps: new Date().toISOString()
    })
    const statusCode = err.statusCode || 500;
    const message = statusCode < 500 ? err.message : 'Internal server error!'

    res.status(statusCode).json(failedResponse(message));
}

export default globalErrorHandler;