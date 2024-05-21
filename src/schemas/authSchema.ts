import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .when('email', {
      is: Joi.exist(),
      then: Joi.string().email().required(),
    })
    .when('phone', {
      is: Joi.exist(),
      then: Joi.string()
        .min(10)
        .max(12)
        .required()
        .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
        .messages({
          'string.pattern.base':
            'Invalid phone number Must start with 078, 073, 072 or 079',
        }),
    })
    .messages({
      'string.email': 'Invalid email',
      'any.required': 'Email is required',
    }),
  password: Joi.string().required().messages({
    'string.max': 'password must be at least 6 characters',
    'any.required': 'password is required',
    'string.empty': 'password cannot be empty',
    'string.base': 'PIN must be a number',
  }),
});
