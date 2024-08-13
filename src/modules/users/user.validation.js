import JoiBase  from "joi";
import JoiDate from '@joi/date'

const Joi = JoiBase .extend(JoiDate)

const signUpValidationSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': `first name should have a minimum length of 3 char`,
            'string.max': `first name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    lastName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': `last name should have a minimum length of 3 char`,
            'string.max': `last name should have a maximum length of 50 char`,
            'string.empty': `this field is required`
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `you should enter a valid email`,
            'string.empty': `this field is required`
        }),

    password: Joi.string()
        .pattern(/(?=.*[A-Z]+)(?=.*\d)(?=.*[a-z]*)(?=.*[\W_]+).{8,}/)
        .required()
        .messages({
            'string.pattern.base': `password length must be at least 8 char, must contains at least 1 capital char, at least 1 special char and must contains numbers`,
            'string.empty': `this field is required`
        }),

    confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': `wrong confirm password!`,
            'string.empty': `this field is required`
        }),

    recoveryEmail: Joi.string()
        .email()
        .optional()
        .messages({
            'string.email': `you should enter a valid email`
        }),

    DOB: Joi.date()
        .format("YYYY-MM-DD")
        .raw()
        .required()
        .messages({
            'date.format': `date format must be like "DD-MM-YYYY"`,
        }),

    mobileNumber: Joi.string()
        .pattern(/^01([0-2]|5)\d{8}$/)
        .required()
        .messages({
            'string.pattern.base': `invalid mobile number`,
        }),

    role: Joi.string()
        .valid('User','Company_HR')
        .messages({
            'string.valid': `role must be User or Company_HR`,
        }),

    status: Joi.string()
        .valid('online','offline')
        .messages({
            'string.valid': `status must be online or offline`,
        }),
})

const signInValidationSchema = Joi.object({
    data: Joi.string()
        .required()
        .messages({
            'string.empty': `this field is required`
        }),

    password: Joi.string()
        .required()
        .pattern(/(?=.*[A-Z]+)(?=.*\d)(?=.*[a-z]*)(?=.*[\W_]+).{8,}/)
        .messages({
            'string.pattern.base': `password length must be at least 8 char, must contains at least 1 capital char, at least 1 special char and must contains numbers`,
            'string.empty': `this field is required`
        }),

    confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': `wrong confirm password!`,
        }),
})

const updateAccountValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.empty': `this field is required`
        }),

    mobileNumber: Joi.string()
        .pattern(/^01([0-2]|5)\d{8}$/)
        .optional()
        .messages({
            'string.pattern.base': `invalid mobile number`,
            'string.empty': `this field is required`
        }),

    recoveryEmail: Joi.string()
        .email()
        .optional()
        .messages({
            'string.empty': `this field is required`
        }),

    DOB: Joi.date()
    .format("YYYY-MM-DD")
    .raw()
    .optional()
    .messages({
        'date.format': `date format must be like "DD-MM-YYYY"`,
        'string.empty': `this field is required`
    }),

    firstName: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .messages({
        'string.min': `first name should have a maximum length of 3 char`,
        'string.max': `first name should have a minimum length of 3 char`,
        'string.empty': `this field is required`
    }),

    lastName: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.max': `last name should have a maximum length of 3 char`,
            'string.empty': `this field is required`
        }),
})

const updatePasswordValidationSchema = Joi.object({
    oldPassword: Joi.string()
        .required()
        .pattern(/(?=.*[A-Z]+)(?=.*\d)(?=.*[a-z]*)(?=.*[\W_]+).{8,}/)
        .messages({
            'string.pattern.bae': `password length must be at least 8 char, must contains at least 1 capital char, at least 1 special char and must contains numbers`,
            'string.empty': `this field is required`
        }),

    newPassword: Joi.string()
        .required()
        .pattern(/(?=.*[A-Z]+)(?=.*\d)(?=.*[a-z]*)(?=.*[\W_]+).{8,}/)
        .messages({
            'string.pattern.base': `password length must be at least 8 char, must contains at least 1 capital char, at least 1 special char and must contains numbers`,
            'string.empty': `this field is required`
        }),

    confirm_password: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': `wrong password!`,
        }),
})

const forgetPasswordValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `you should enter a valid email`,
            'string.empty': `this field is required`
        })
})

const verifyPasswordValidationSchema = Joi.object({
    OTPCode: Joi.string()
        .min(6)
        .max(6)
        .required()
        .messages({
            'string.max': `OTP code length should be 6 char`,
            'string.empty': `this field is required`
        })
})

const updateVerifyedPasswordValidationSchema = Joi.object({
    newPassword: Joi.string()
        .required()
        .pattern(/(?=.*[A-Z]+)(?=.*\d)(?=.*[a-z]*)(?=.*[\W_]+).{8,}/)
        .messages({
            'string.pattern.base': `password length must be at least 8 char, must contains at least 1 capital char, at least 1 special char and must contains numbers`,
            'string.empty': `this field is required`
        }),

    confirm_password: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': `wrong password!`,
        }),
})

export {
    signUpValidationSchema,
    signInValidationSchema,
    updateAccountValidationSchema,
    updatePasswordValidationSchema,
    forgetPasswordValidationSchema,
    verifyPasswordValidationSchema,
    updateVerifyedPasswordValidationSchema
}