import { Router } from 'express';

import * as roleController from '@/controllers/role';
import { cache, isAuthenticated, validate } from '@/middleware';
import * as roleValidations from '@/routes/validations/role';

const router = Router();
router.route('/')
  .get(isAuthenticated, validate(roleValidations.listRoleRules), roleController.getRoles)
  .post(isAuthenticated, validate(roleValidations.createRoleRules), roleController.createRole);

router.route('/all')
  .get(isAuthenticated, roleController.getAllRoles);

router.route('/permissions')
  .get(isAuthenticated, roleController.getPermissions);

router.route('/:id')
  .get(isAuthenticated, roleController.getRole)
  .put(isAuthenticated, validate(roleValidations.updateRoleRules), roleController.updateRole)
  .delete(isAuthenticated, roleController.deleteRole);



export default router;