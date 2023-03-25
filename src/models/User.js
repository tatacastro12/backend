import { Schema , model } from 'mongoose';

const User = new Schema({
    email: {type: String, required: true, unique:true, lowercase: true},
    password: {type: String, required: true},
    role: {type:String, enum:['adm','pro'],required: true},
    resetPasswordToken: {type:String}
});

export default model('User',User);
