import JoiBase from "joi";
import JoiDate from '@joi/date'

const Joi = JoiBase.extend(JoiDate)

const addJobValidationSchema = Joi.object({
    jobTitle: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': `first name should have a minimum length of 3 char`,
            'string.max': `first name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    jobLocation: Joi.string()
        .valid('onsite','remotely', 'hybrid')
        .messages({
            'string.valid': `job location must be onsite or remotely or hybrid`,
        }),

    seniorityLevel: Joi.string()
        .valid('Junior','Mid-Level', 'Senior', 'Team-Lead', 'CTO')
        .messages({
            'string.valid': `seniority level must be Junior or Mid-Level or Senior or Team-Lead or CTO`,
        }),

    workingTime: Joi.string()
        .valid('full-time','part-time')
        .messages({
            'string.valid': `seniority level must be full-time or part-time`,
        }),

    jobDescription: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': `first name should have a minimum length of 3 char`,
            'string.max': `first name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    technicalSkills: Joi.array()
        .items(Joi.string())
        .required()
        .messages({
            'string.array': `technicalSkills must be an array`,
            'string.empty': `this field is required`
        }),

    softSkills: Joi.array()
        .items(Joi.string())
        .optional()
        .messages({
            'string.array': `softSkills must be an array`,
        }),
        
    // addedBy: Joi.string()
    //     .hex()
    //     .required()
    //     .messages({
    //         'any.required': `this field is required`,
    //     }),
})

const updateJobValidationSchema = Joi.object({
    jobTitle: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': `Job Title should have a minimum length of 3 char`,
            'string.mimaxn': `Job Title should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    jobLocation: Joi.string()
        .valid('onsite','remotely', 'hybrid')
        .optional()
        .messages({
            'string.valid': `job location must be onsite or remotely or hybrid`,
        }),

    seniorityLevel: Joi.string()
        .valid('Junior','Mid-Level', 'Senior', 'Team-Lead', 'CTO')
        .optional()
        .messages({
            'string.valid': `seniority level must be Junior or Mid-Level or Senior or Team-Lead or CTO`,
        }),

    workingTime: Joi.string()
        .valid('full-time','part-time')
        .optional()
        .messages({
            'string.valid': `seniority level must be full-time or part-time`,
        }),

    jobDescription: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': `first name should have a minimum length of 3 char`,
            'string.max': `first name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    technicalSkills: Joi.array()
        .items(Joi.string())
        .optional()
        .messages({
            'string.array': `technicalSkills must be an array`,
        }),

    softSkills: Joi.array()
        .items(Joi.string())
        .optional()
        .messages({
            'string.array': `softSkills must be an array`,
        }),
        
    // addedBy: Joi.string()
    //     .hex()
    //     .required()
    //     .messages({
    //         'any.required': `this field is required`,
    //     }),
})

export {
    addJobValidationSchema,
    updateJobValidationSchema
}