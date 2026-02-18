export const successResponse = (message:string,  data?: unknown) => {
    return {
        success: true,
        timestamps: new Date(),
        message,
        data
    }
}

export const failedResponse = (message:string) => {
    return{
        success: false,
        timestamps: new Date(),
        message
    }
}