
export const checkUserRole = async (req, res, next) => {
    const user = req.user;
    if (user.role !== "User") 
        return res.status(401).json({msg: "you are not user role, you can't access this route"})
    next()
}