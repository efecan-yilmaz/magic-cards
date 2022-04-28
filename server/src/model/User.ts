import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String
});

const userModel =  mongoose.model('User', userSchema);

export { userModel as UserModel };