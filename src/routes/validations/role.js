import { body, query } from 'express-validator';

export const listRoleRules = [
    query('page').optional().isInt().toInt(),
    query('perPage').optional().isInt().toInt(),
];

export const createRoleRules = [
    body('name').exists(),
    body('permissions').isArray().exists(),
];

export const updateRoleRules = [
    body('name').optional(),
    body('permissions').optional().isArray(),
];