import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object:
  const userData: Partial<TUser> = {};
  // if password is not given set default password:
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info:
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error(
      `Academic Semester with ID ${payload.admissionSemester} not found.`,
    );
  }
  // set generated id:
  userData.id = await generatedStudentId(admissionSemester);
  const newUser = await User.create(userData);

  //   create a student if user exist:
  if (Object.keys(newUser).length) {
    // set id, _id as user:
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};
