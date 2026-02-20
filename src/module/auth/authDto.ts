export interface registrationRequest{
    username: string;
    password: string;
    email: string;
};

export interface loginResponse{
    login: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface loginRequest{
    username: string;
    password: string;
}

export interface refreshResponse{
    accessToken: string;
    refreshToken: string;
}