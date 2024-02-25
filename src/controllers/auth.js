import createError from 'http-errors';

import db from '@/database';
import role from '@/consts/roles';

/**
 * POST /auth/login
 * Login request
 */
export const login = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    const { email, password } = req.body;

    // Find user by email address
    const user = await db.models.user.findOne({ where: { email } });
    if (!user) {
      return next(createError(400, 'There is no user with this email address!'));
    }

    // Check user password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return next(createError(400, 'Incorrect password!'));
    }

    // Generate and return token
    const token = user.generateToken();
    const refreshToken = user.generateToken('2h');
    return res.status(200).json({ token, refreshToken });
  } catch (err) {
    return next(err);
  }
};

/**
 * POST /auth/register
 * Register request
 */
export const register = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    const body = req.body;
    const roleIdUser = await db.models.role.findOne({ where: { name: role.USER} });
    body.roleId = roleIdUser.id;
    // Create user
    const user = await db.models.user
      .create(body, {
        fields: ['firstName', 'lastName', 'email', 'password', 'roleId'],
      });

    // Generate and return tokens
    const token = user.generateToken();
    const refreshToken = user.generateToken('2h');
    res.status(201).json({ token, refreshToken });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /auth/me
 * Get current user
 */
export const getCurrentUser = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    const role = await req.user.getRole();
    req.user.dataValues.role = role;
    delete req.user.dataValues.password;
    delete req.user.dataValues.roleId;
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /auth/me
 * Update current user
 */
export const updateCurrentUser = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    await req.user.update(req.body, {
      fields: ['firstName', 'lastName', 'email'],
    });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /auth/me
 * Delete current user
 */
export const deleteCurrentUser = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    await req.user.destroy();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /auth/me/password
 * Update password of current user
 */
export const updatePassword = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  try {
    const { current, password } = req.body;
    console.log(current, password);

    // Check user password
    const isValidPassword = await req.user.validatePassword(current);
    if (!isValidPassword) {
      return next(createError(400, 'Incorrect password!'));
    }

    // Update password
    req.user.password = password;
    await req.user.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};
