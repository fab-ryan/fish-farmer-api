import Joi from 'joi';

export const roleSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name must be a string',
    'string.empty': 'name cannot be an empty field',
    'any.required': 'name is a required field',
  }),
  description: Joi.string().optional(),
});

export const getRoleSchema = Joi.object({
  id: Joi.string()
    .required()
    .uuid({ version: ['uuidv4'] })
    .messages({
      'string.base': 'id must be a string',
      'string.empty': 'id cannot be an empty field',
      'any.required': 'id is a required field',
      'string.uuid': 'id must be a valid id',
      'string.GUID': 'id must be a valid ID',
    }),
});
