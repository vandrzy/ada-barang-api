import User, { UserInterface } from "./userModel";

export const createUser = async (
    data: {username: string, password: string, email: string}): Promise<UserInterface> => {
    return await User.create(data);
}

export const getUserByUsername = async (username: string): Promise<UserInterface | null> => {
    return await User.findOne({username});
}

export const getUserByEmail = async (email: string): Promise<UserInterface|null> => {
    return await User.findOne({email})
}

export const createAdmin = async (data: {username: string, password: string, email: string, role: string}) : Promise<UserInterface> => {
    return await User.create(data);
}