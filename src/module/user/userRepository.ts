import User, { UserInterface } from "./userModel";

export const createUser = async (
    data: {username: string, password: string, email: string}): Promise<UserInterface> => {
    return await User.create(data);
}

export const getUserByUsername = async (username: string) => {
    return await User.findOne({username});
}

export const getUserByEmail = async (email: string) => {
    return await User.findOne({email})
}