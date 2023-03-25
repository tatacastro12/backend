import { hash , genSalt , compare } from 'bcryptjs';

export const hashPassword = async (password) => {
    try {
        const salt = await genSalt(10);
        const hashedPass = await hash(password,salt);
        return hashedPass
    } catch (error) {
        throw error;        
    }
}

export const checkPassword = async (password,hash) => {
    try {
        const isValid = await compare(password,hash);
        return { isValid }
    } catch (error) {
        throw error;
    }
}