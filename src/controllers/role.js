import createError from 'http-errors';
import db from '@/database';
import permissions from '@/consts/permissions';

/**
 * GET /roles
 * List all roles with pagination
 */
export const getRoles = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        const { page = 1, perPage = 10 } = req.query;
        const offset = page * perPage - perPage;

        const roleListResponse = await db.models.role
            .findAndCountAll({
                offset,
                limit: perPage,
                include: {
                    model: db.models.permission,
                    attributes: ['name'],
                },
                order: [['createdAt', 'DESC']],
            });

        const totalPage = Math.ceil(roleListResponse.count / perPage);
        const response = {
            ...roleListResponse, page, totalPage, perPage,
        };
        return res.json(response);
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /roles/all
 * List all roles
 */
export const getAllRoles = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        const roles = await db.models.role.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.json(roles.map(role => {
            return {
                id: role.id,
                name: role.name,
            }
        }));
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /roles/:id
 * Get roles with id
 */
export const getRole = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        const { id } = req.params;
        const role = await db.models.role.findByPk(id, {
            include: {
                model: db.models.permission,
                attributes: ['name'],
            },
        });

        if (!role) {
            throw createError(404, 'Role not found');
        }
        return res.json(role);
    } catch (err) {
        return next(err);
    }
}

/**
 * GET /roles/permissions
 * List all permissions
 */
export const getPermissions = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        const listPermissions = Object.keys(permissions).map(key => {
            return {
                id: key,
                name: permissions[key],
            }
        });
        return res.json(listPermissions);
    } catch (err) {
        return next(err);
    }
}

/**
 * POST /roles
 * Create roles
 */
export const createRole = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        // Check Role name is already exist
        const roleExist = await db.models.role.findOne({ where: { name: req.body.name } });
        if (roleExist) {
            return next(createError(400, 'Role name already exist'));
        }

        const role = await db.models.role.create(req.body, {
            fields: ['name'],
        });
        const permission = req.body.permissions || [];
        if (permission.length) {
            await db.models.permission.bulkCreate(permission.map(p => {
                return {
                    name: p,
                    roleId: role.id,
                }
            }));
        }
        return res.status(201).json(role);
    } catch (err) {
        return next(err);
    }
}

/**
 * PUT /roles/:id
 * Update roles with id
 */
export const updateRole = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        const { id } = req.params;
        const role = await db.models.role.findByPk(id);
        if (!role) {
            throw createError(404, 'Role not found');
        }
        await role.update(req.body, {
            fields: ['name'],
        });
        const permission = req.body.permissions || [];
        await db.models.permission.destroy({ where: { roleId: id } });
        if (permission.length) {
            await db.models.permission.bulkCreate(permission.map(p => {
                return {
                    name: p,
                    roleId: role.id,
                }
            }));
        }
        return res.json(role);
    } catch (err) {
        return next(err);
    }
}

/**
 * DELETE /roles/:id
 * Delete roles with id
 */
export const deleteRole = async (req, res, next) => {
    // #swagger.tags = ['Role']
    try {
        const { id } = req.params;
        const role = await db.models.role.findByPk(id);
        if (!role) {
            throw createError(404, 'Role not found');
        }
        await role.destroy();
        return res.json({ success: true });
    } catch (err) {
        return next(err);
    }
}