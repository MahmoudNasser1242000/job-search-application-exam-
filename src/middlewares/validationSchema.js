const validationSchema = (Schema) => {
    return (req, res, next) => {
        const {error} = Schema.validate(req.body, {abortEarly: false})
        if (error)
            return res.status(400).json({error: error?.details})
        next()
    }
}

export default validationSchema;