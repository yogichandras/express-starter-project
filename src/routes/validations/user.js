import { body, query } from 'express-validator';

export const listUserRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export const createUserRules = [
  body('firstName').exists(),
  body('lastName').exists(),
  body('email').exists().isEmail(),
  body('password').isLength({ min: 6 }).exists(),
  body('roleId').exists().isInt(),
];

export const updateUserRules = [
  body('firstName').optional(),
  body('lastName').optional(),
  body('email').optional().isEmail(),
  body('roleId').optional().isInt(),
];
