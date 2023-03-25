import { decode } from 'jwt-simple';
import {} from 'dotenv/config';

const secret = process.env.SECRET;

export const Auth = (req,res,next) => {
    if(!req.headers.authorization) return res.status(403).send({success:false,message: 'Sin cabeceras de autenticación'});

    const token = req.headers.authorization.split(' ')[1];
    const { sub , role } = decode(token,secret);

    req.user = sub;
    req.role = role;
    next();
}
//sabe  o no si hay token