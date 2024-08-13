import jwt from "jsonwebtoken";

const checkVerificationLink = (req, res, next) => {
    const {token} = req.params;
    
    const tokenDecode = jwt.verify(token, "VerificationLink")

    if (!tokenDecode.email)
        return res.status(400).json({msg: "Must signup first"})

    req.email = tokenDecode.email
    next()
}

export default checkVerificationLink;