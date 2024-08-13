import JoiBase from "joi";
import JoiDate from '@joi/date'

const Joi = JoiBase.extend(JoiDate)

const addApplicationValidationSchema = Joi.object({
    userTechSkills: Joi.array()
        .items(Joi.string())
        .required()
        .messages({
            'string.array': `userTechSkills must be an array`,
            'any.required': `this field is required`
        }),

    userSoftSkills: Joi.array()
        .items(Joi.string())
        .required()
        .messages({
            'string.array': `userSoftSkills must be an array`,
            'any.required': `this field is required`
        }),

    userResume : Joi.string()
        .required()
        .messages({
            'any.required': `this field is required`
        }),
})

export {
    addApplicationValidationSchema
}