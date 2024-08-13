import jobModel from "../../dbConnection/models/jobs.model.js";

const checkJobId = async (req, res, next) => {
    let {jobId} = req.params;
    const job = await jobModel.findById(jobId)

    if(!job)
        return res.status(400).json({msg: "Can not find job with this id"})

    req.job = job
    next()
}

export default checkJobId