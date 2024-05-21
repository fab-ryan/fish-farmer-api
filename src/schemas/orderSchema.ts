import joi from 'joi';

export const orderCreateSchema = joi.object({
  product_id: joi.string().required().messages({
    'string.base': 'product must be a string',
    'string.empty': 'product cannot be an empty field',
    'any.required': 'product is a required field',
  }),
  quantity: joi.number().required().messages({
    'number.base': 'quantity must be a number',
    'number.empty': 'quantity cannot be an empty field',
    'any.required': 'quantity is a required field',
  }),
  status: joi
    .string()
    .pattern(/^(pending|completed|canceled)$/)
    .messages({
      'string.base': 'status must be a string',
      'string.empty': 'status cannot be an empty field',
      'any.required': 'status is a required field',
      'string.pattern.base':
        'status must be one of pending, completed, canceled',
    })
    .optional(),
});

export const orderUpdateSchema = joi
  .object({
    status: joi
      .string()
      .pattern(/^(pending|processing|completed|canceled|delivered)$/)
      .messages({
        'string.base': 'status must be a string',
        'string.empty': 'status cannot be an empty field',
        'any.required': 'status is a required field',
        'string.pattern.base':
          'status must be one of pending, completed, canceled',
      }),
  })
  .concat(orderCreateSchema)
  .optional();

export const orderQuerySchema = joi
  .object({
    id: joi.string().messages({
      'string.base': 'id must be a string',
      'string.empty': 'id cannot be an empty field',
    }),
  })
  .or('id');

export const orderStatusSchema = joi.object({
  status: joi
    .string()
    .pattern(/^(pending|processing|completed|canceled|delivered)$/)
    .messages({
      'string.base': 'status must be a string',
      'string.empty': 'status cannot be an empty field',
      'any.required': 'status is a required field',
      'string.pattern.base':
        'status must be one of pending, processing, completed, canceled, delivered',
    }),
});
