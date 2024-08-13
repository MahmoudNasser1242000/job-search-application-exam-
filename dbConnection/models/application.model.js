import mongoose from 'mongoose';
const { Schema } = mongoose;

const applicationSchema = new Schema({
    userTechSkills: [String],
    userSoftSkills: [String],
    userResume : {
        public_id: String,
        secure_url: String
    },
    jobId: {
        type: Schema.Types.ObjectId, 
        ref: "Job", 
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
}, {timestamps: true});

const applicationModel = mongoose.model('Application', applicationSchema);
export default applicationModel