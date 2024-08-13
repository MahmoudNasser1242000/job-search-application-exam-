import JoiBase from "joi";
import JoiDate from '@joi/date'

const Joi = JoiBase.extend(JoiDate)

const addCopmanyValidationSchema = Joi.object({
    companyName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': `first name should have a minimum length of 3 char`,
            'string.empty': `this field is required`
        }),

    description: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': `last name should have a minimum length of 3 char`,
            'string.max': `last name should have a maximum length of 50 char`,
        }),

    industry: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': `last name should have a minimum length of 3 char`,
            'string.max': `last name should have a maximum length of 50 char`,
            'any.required': `this field is required`
        }),

    address: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.min': `last name should have a minimum length of 3 char`,
            'string.max': `last name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    companyEmail: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `invalid email!`,
            'string.empty': `this field is required`
        }),

    numberOfEmployees: Joi.number()
        .integer()
        .min(11)
        .max(20)
        .required()
        .messages({
            'string.min': `Number of employees must be range such as 11-20 employee`,
            'string.max': `Number of employees must be range such as 11-20 employee`,
            'string.empty': `this field is required`
        }),

    // companyHR: Joi.string()
    //     .hex()
    //     .required()
    //     .messages({
    //         'any.required': `this field is required`,
    //     }),
})

const updateCopmanyValidationSchema = Joi.object({
    companyName: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': `Company name should have a minimum length of 3 char`,
            'string.max': `Company name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    description: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': `Description should have a minimum length of 3 char`,
            'string.max': `Description should have a maximum length of 50 char`,
        }),

    industry: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': `Industry should have a minimum length of 3 char`,
            'string.max': `Industry should have a maximum length of 50 char`,
            'any.required': `this field is required`
        }),

    address: Joi.string()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': `Address should have a minimum length of 3 char`,
            'string.max': `Address should have a maximum length of 50 char`,
            'any.required': `this field is required`
        }),

    companyEmail: Joi.string()
        .email()
        .optional()
        .messages({
            'string.email': `invalid email!`,
            'string.empty': `this field is required`
        }),

    numberOfEmployees: Joi.number()
        .integer()
        .min(11)
        .max(20)
        .optional()
        .messages({
            'string.min': `Number of employees must be range such as 11-20 employee`,
            'string.max': `Number of employees must be range such as 11-20 employee`,
            'string.empty': `this field is required`
        }),
})

const addExcelSheetWithDate = Joi.object({
    date: Joi.date()
    .format("YYYY-MM-DD")
    .raw()
    .required()
    .messages({
        'date.format': `date format must be like "DD-MM-YYYY"`,
        'string.date': `Data must be a valid date"`,
    }),
})

export {
    addCopmanyValidationSchema,
    updateCopmanyValidationSchema,
    addExcelSheetWithDate
}