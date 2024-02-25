import createError from 'http-errors';
import db from '@/database';

/**
 * GET /users
 * List all users with pagination
 */
export const getUsers = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        const { page = 1, perPage = 10 } = req.query;
        const offset = page * perPage - perPage;

        const userListResponse = await db.models.user
            .findAndCountAll({
                offset,
                limit: perPage,
                include: {
                    model: db.models.role,
                    attributes: ['id', 'name'],
                    include: {
                        model: db.models.permission,
                        attributes: ['name'],
                    },
                },
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['password', 'roleId'] }
            });

        const totalPage = Math.ceil(userListResponse.count / perPage);
        const response = {
            ...userListResponse, page, totalPage, perPage,
        };
        return res.json(response);
    } catch (err) {
        return next(err);
    }
};

/**
 * GET /users/:id
 * Get users with id
 */
export const getUser = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        const { id } = req.params;
        const user = await db.models.user.findByPk(id, {
            include: {
                model: db.models.role,
                attributes: ['id', 'name'],
                include: {
                    model: db.models.permission,
                    attributes: ['name'],
                },
            },
            attributes: { exclude: ['password', 'roleId'] }
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        return res.json(user);
    } catch (err) {
        return next(err);
    }
}

/**
 * POST /users
 * Create users
 */
export const createUser = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        const user = await db.models.user.create(req.body, {
            fields: ['firstName', 'lastName', 'email', 'password', 'roleId']
        });
        delete user.password;
        return res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: user.roleId
        });
    } catch (err) {
        return next(err);
    }
}

/**
 * PUT /users/:id
 * Update users with id
 */
export const updateUser = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        const { id } = req.params;
        const user = await db.models.user.findByPk(id);

        if (!user) {
            throw createError(404, 'User not found');
        }

        await user.update(req.body, {
            fields: ['firstName', 'lastName', 'email', 'roleId']
        });
        return res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: user.roleId
        });
    } catch (err) {
        return next(err);
    }
}

/**
 * DELETE /users/:id
 * Delete users with id
 */
export const deleteUser = async (req, res, next) => {
    // #swagger.tags = ['User']
    try {
        const { id } = req.params;
        const user = await db.models.user.findByPk(id);

        if (!user) {
            throw createError(404, 'User not found');
        }

        await user.destroy();
        return res.json({ success: true });
    } catch (err) {
        return next(err);
    }
}