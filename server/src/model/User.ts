import mongoose from 'mongoose';

export interface IUser {
    userName: string;
    password: string;
    email: string;
    salt: string;
}

const userSchema = new mongoose.Schema<IUser>({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model<IUser>('User', userSchema);

export { userModel as User };