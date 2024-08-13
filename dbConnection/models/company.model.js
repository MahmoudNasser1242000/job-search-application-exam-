import mongoose from 'mongoose';
const { Schema } = mongoose;

const companySchema = new Schema({
    companyName: String,
    description: String,
    industry: String,
    address: String,
    numberOfEmployees: {
        type: Number,
    },
    companyEmail: {
        type: String,
    },
    companyHR: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
}, {timestamps: true});

const companyModel = mongoose.model('Company', companySchema);
export default companyModel