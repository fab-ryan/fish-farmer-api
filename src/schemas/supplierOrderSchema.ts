import joi from 'joi';

export const supplierOrderCreateSchema = joi.object({
  order_id: joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'string.base': 'order must be a string',
    'string.empty': 'order cannot be an empty field',
    'any.required': 'order is a required field',
    'string.uuid': 'order must be a valid UUID',
  }),
  supplier_id: joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'string.base': 'supplier must be a string',
    'string.empty': 'supplier cannot be an empty field',
    'any.required': 'supplier is a required field',
    'string.uuid': 'supplier must be a valid UUID',
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

export const supplierOrderUpdateSchema = joi
  .object({
    status: joi
      .string()
      .pattern(/^(pending|completed|canceled)$/)
      .messages({
        'string.base': 'status must be a string',
        'string.empty': 'status cannot be an empty field',
        'any.required': 'status is a required field',
        'string.pattern.base':
          'status must be one of pending, completed, canceled',
      }),
  })
  .concat(supplierOrderCreateSchema)
  .optional();

export const supplierOrderStatusSchema = joi.object({
  status: joi
    .string()
    .pattern(/^(pending|completed|canceled|processing)$/)
    .messages({
      'string.base': 'status must be a string',
      'string.empty': 'status cannot be an empty field',
      'any.required': 'status is a required field',
      'string.pattern.base':
        'status must be one of pending, completed, canceled or processing',
    })
    .required(),
});
