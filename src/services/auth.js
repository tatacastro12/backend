import { encode } from 'jwt-simple';
import {} from 'dotenv/config';
import dayjs from 'dayjs'; // Para manejo de fechas;

const secret = process.env.SECRET;

export const createToken = (user) => {
    const payload = {
        sub: user._id,
        role: user.role,
        email: user.email,
        iat: dayjs(),
        exp: dayjs().add(1,'hour')
    }

    const token = encode(payload,secret);
    return token;
}

export const pResetToken = (user) => {
    const payload = {
        sub: user._id,
        iat: dayjs(),
        exp: dayjs().add(10,'minutes')
    }

    const token = encode(payload,secret);
    return token;
}