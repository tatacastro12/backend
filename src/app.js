import express from 'express';
import cors from 'cors';
import { SignIn, SignUP, forgotPassword } from './controllers/users';
import { Auth } from './middlewares/Auth';

export const app = express();

app.use(cors('*'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login',SignIn);
app.post('/register',SignUP);
app.post('/forgot',forgotPassword);
app.get('/test',Auth,(req,res) => {
    return res.status(200).send({message:'Bienvenido',user:req.user,role:req.role});
});

