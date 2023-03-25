import User from '../models/User';
import { hashPassword , checkPassword } from '../services/password';
import { createToken , pResetToken } from '../services/auth';
import { transporter , emailPort } from '../constants/email';

export const SignUP = async (req,res,next) => {
    try {
        let { email , password , role } = req.body;
        let hash = await hashPassword(password);
        password = hash;
        const user = new User({email,password,role});
        const userSaved = await user.save();
        const token = createToken(userSaved);
        return res.status(200).send({success:true,token,doc:userSaved});
    } catch (error) {
        next(error);
    }
}

export const SignIn = async (req,res,next) => {
    try {
        let { email , password } = req.body;
        let user = await User.findOne({email});
        if(!user) res.status(401).send({success:false,message:'Usuario y/o contraseña, inválidos.'});
        const { isValid } = await checkPassword(password,user.password);
        if(!isValid) res.status(401).send({success:false,message:'Usuario y/o contraseña, inválidos.'});
        const token = createToken(user);
        return res.status(200).send({success:true,token,doc:user});
    } catch (error) {
        next(error);
    }
}


export const forgotPassword = async (req,res,next) => {
    try {
        if(!req.body.email) return res.status(400).send({success:false,message:"Se require un correo electrónico"});
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(403).send({success:false, message: "No existe la cuenta"});
        const token = pResetToken(user);
        user.updateOne({resetPasswordToken: token});
        const mailOptions = {
            from: "angeldesweb@gmail.com",
            to:`${user.email}`,
            subject: "Enlace para recuperar contraseña",
            text: 'Reestablecer contraseña',
            html: `<a href="${emailPort}/reset/${user._id}/${token}">Link de recuperación</a>`
        }
        transporter.sendMail(mailOptions,(err,response) => {
            if(err) {
                console.log('Ha ocurrido un error', err);
                return next(err);
            } else {
                console.log(response);
                return res.status(200).send({success:true,message:"Mensaje de recuperación enviado"})
            }
        });
    } catch(error) {
        next(error);
    }
}