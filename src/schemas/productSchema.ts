import Joi from 'joi';

export const productCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name must be a string',
    'string.empty': 'name cannot be an empty field',
    'any.required': 'name is a required field',
  }),
  price: Joi.number().required().messages({
    'number.base': 'price must be a number',
    'number.empty': 'price cannot be an empty field',
    'any.required': 'price is a required field',
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'quantity must be a number',
    'number.empty': 'quantity cannot be an empty field',
    'any.required': 'quantity is a required field',
  }),
  unit: Joi.string()
    .pattern(/^(kg|pcs|g|mg|l|ml|ton)$/)
    .required()
    .messages({
      'string.base': 'unit must be a string',
      'string.empty': 'unit cannot be an empty field',
      'any.required': 'unit is a required field',
      'string.pattern.base': 'unit must be one of kg, pcs, g, mg, l, ml, ton',
    }),
  description: Joi.string().required().messages({
    'string.base': 'description must be a string',
    'string.empty': 'description cannot be an empty field',
    'any.required': 'description is a required field',
  }),
  status: Joi.string()
    .pattern(/^(active|inactive)$/)
    .messages({
      'string.base': 'status must be a string',
      'string.empty': 'status cannot be an empty field',
      'any.required': 'status is a required field',
      'string.pattern.base': 'status must be one of active, inactive',
    })
    .optional(),
});

export const idQueryParamsSchema = Joi.object({
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

export const productSlugSchema = Joi.object({
  slug: Joi.string().required().messages({
    'string.base': 'slug must be a string',
    'string.empty': 'slug cannot be an empty field',
    'any.required': 'slug is a required field',
  }),
});
