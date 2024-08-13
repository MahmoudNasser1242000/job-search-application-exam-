import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobTitle: String,
    jobLocation: {
        type: String,
        enum : ['onsite','remotely', 'hybrid'],
        default: "onsite"
    },
    workingTime: {
        type: String,
        enum : ['full-time','part-time'],
        default: "part-time"
    },
    seniorityLevel: {
        type: String,
        enum : ['Junior','Mid-Level', 'Senior', 'Team-Lead', 'CTO '],
        default: "Junior"
    },
    jobDescription: String,
    technicalSkills: {
        type: [String],
    },
    softSkills: {
        type: [String],
    },
    addedBy: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
}, {timestamps: true});

const jobModel = mongoose.model('Job', jobSchema);
export default jobModel