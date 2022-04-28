import mongoose from 'mongoose';

interface IUser {
    userName: string;
    password: string;
    email: string;
}

const userSchema = new mongoose.Schema<IUser>({
    userName: String,
    password: String,
    email: String
});

const userModel = mongoose.model<IUser>('User', userSchema);

export { userModel as UserModel };