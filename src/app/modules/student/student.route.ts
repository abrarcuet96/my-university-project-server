import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
