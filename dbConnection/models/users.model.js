import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: {
        type: String,
        unique: true
    },
    emailConfirm: {
        type: Boolean,
        default: false
    },
    password: String,
    recoveryEmail: {
        type: String,
        unique: false,
        default: ""
    },
    DOB: String,
    mobileNumber: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum : ['User','Company_HR'],
        default: 'User'
    },
    status: {
        type: String,
        enum : ['online','offline'],
        default: 'offline'
    },
    OTPCode: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
export default userModel