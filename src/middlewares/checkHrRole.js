
export const checkHrRole = async (req, res, next) => {
    const user = req.user;
    if (user.role !== "Company_HR") 
        return res.status(401).json({msg: "you are not Copmany HR, you can't access this route"})
    next()
}