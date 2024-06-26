import Joi from 'joi';

export const userCreationSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.base': 'first_name must be a string',
    'string.empty': 'first_name cannot be an empty field',
    'any.required': 'first_name is a required field',
  }),
  last_name: Joi.string().required().messages({
    'string.base': 'last_name must be a string',
    'string.empty': 'last_name cannot be an empty field',
    'any.required': 'last_name is a required field',
  }),
  username: Joi.string().optional().messages({
    'string.base': 'username must be a string',
    'string.empty': 'username cannot be an empty field',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email must be a string',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is a required field',
    'string.email': 'email must be a valid email',
  }),
  phone: Joi.string()
    .min(10)
    .max(12)
    .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
    .messages({
      'string.base': 'phone must be a string',
      'string.empty': 'phone cannot be an empty field',
      'any.required': 'phone is a required field',
      'string.pattern.base':
        'Invalid phone number Must start with 078, 073, 072 or 079',
    }),
  password: Joi.string().required().messages({
    'string.base': 'password must be a string',
    'string.empty': 'password cannot be an empty field',
    'any.required': 'password is a required field',
  }),
  role_id: Joi.string().optional().messages({
    'string.base': 'role_id must be a string',
    'string.empty': 'role_id cannot be an empty field',
  }),
});

export const userUpdateSchema = Joi.object({
  first_name: Joi.string().optional().messages({
    'string.base': 'first_name must be a string',
    'string.empty': 'first_name cannot be an empty field',
  }),
  last_name: Joi.string().optional().messages({
    'string.base': 'last_name must be a string',
    'string.empty': 'last_name cannot be an empty field',
  }),
  username: Joi.string().optional().messages({
    'string.base': 'username must be a string',
    'string.empty': 'username cannot be an empty field',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'email must be a string',
    'string.empty': 'email cannot be an empty field',
    'string.email': 'email must be a valid email',
  }),
  phone: Joi.string()
    .min(10)
    .max(12)
    .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
    .messages({
      'string.base': 'phone must be a string',
      'string.empty': 'phone cannot be an empty field',
      'string.pattern.base':
        'Invalid phone number Must start with 078, 073, 072 or 079',
    }),
  password: Joi.string().optional().messages({
    'string.base': 'password must be a string',
    'string.empty': 'password cannot be an empty field',
  }),
  role_id: Joi.string().optional().messages({
    'string.base': 'role_id must be a string',
    'string.empty': 'role_id cannot be an empty field',
  }),
});

export const userParamQuerySchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'id must be a string',
    'string.empty': 'id cannot be an empty field',
    'any.required': 'id is a required field',
    'string.uuid': 'id must be a valid uuid',
    'string.GUID': 'id must be a valid GUID',
  }),
});

export const updateProfileSchema = Joi.object({
  bio: Joi.string().optional().messages({
    'string.base': 'bio must be a string',
    'string.empty': 'bio cannot be an empty field',
  }),
  company_name: Joi.string().optional().messages({
    'string.base': 'company_name must be a string',
    'string.empty': 'company_name cannot be an empty field',
  }),
  company_website: Joi.string().optional().messages({
    'string.base': 'company_website must be a string',
    'string.empty': 'company_website cannot be an empty field',
  }),
  province: Joi.string().optional().messages({
    'string.base': 'province must be a string',
    'string.empty': 'province cannot be an empty field',
  }),
  district: Joi.string().optional().messages({
    'string.base': 'district must be a string',
    'string.empty': 'district cannot be an empty field',
  }),
  sector: Joi.string().optional().messages({
    'string.base': 'sector must be a string',
    'string.empty': 'sector cannot be an empty field',
  }),
  cell: Joi.string().optional().messages({
    'string.base': 'cell must be a string',
    'string.empty': 'cell cannot be an empty field',
  }),
  village: Joi.string().optional().messages({
    'string.base': 'village must be a string',
    'string.empty': 'village cannot be an empty field',
  }),
});
