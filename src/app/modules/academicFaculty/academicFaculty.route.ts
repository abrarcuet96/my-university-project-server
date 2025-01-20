import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.patch(
  '/:academicFacultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.delete(
  '/:academicFacultyId',
  AcademicFacultyControllers.deleteAcademicFaculty,
);
router.get(
  '/:academicFacultyId',
  AcademicFacultyControllers.getSingleAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

export const AcademicFacultyRoutes = router;
