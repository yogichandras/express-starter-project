import { Router } from 'express';

import * as userController from '@/controllers/user';
import { cache, isAuthenticated, validate } from '@/middleware';
import * as authValidations from '@/routes/validations/user';

const router = Router();
router.route('/')
  .get(isAuthenticated, validate(authValidations.listUserRules), userController.getUsers)
  .post(isAuthenticated, validate(authValidations.createUserRules), userController.createUser);

router.route('/:id')
  .get(isAuthenticated, userController.getUser)
  .put(isAuthenticated, validate(authValidations.updateUserRules), userController.updateUser)
  .delete(isAuthenticated, userController.deleteUser);

export default router;