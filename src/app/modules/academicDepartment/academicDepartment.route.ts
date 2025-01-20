import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.patch(
  '/:academicDepartmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.delete(
  '/:academicDepartmentId',
  AcademicDepartmentControllers.deleteAcademicDepartment,
);
router.get(
  '/:academicDepartmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;
