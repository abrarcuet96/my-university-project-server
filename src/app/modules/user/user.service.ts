/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generatedStudentId,
  generateFacultyId,
} from './user.utils';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object:
  const userData: Partial<TUser> = {};
  // if password is not given set default password:
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  // set student email
  userData.email = payload.email;

  // find academic semester info:
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(StatusCodes.NOT_FOUND, `Admission Semester not found.`);
  }
  // find Academic Department info:
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(StatusCodes.NOT_FOUND, `Academic Department not found.`);
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (!admissionSemester) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Academic Semester with ID ${payload.admissionSemester} not found.`,
      );
    }
    // set generated id:
    userData.id = await generatedStudentId(admissionSemester);
    // send image to cloudinary
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImage = secure_url as string;
    }

    // create a user(transaction-1)
    const newUser = await User.create([userData], { session });

    //   create a student if user exist:
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user:
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student(transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  console.log(payload);

  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'faculty';
  userData.email = payload.email;
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    // send image to cloudinary
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set admin role
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    // send image to cloudinary
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getMe = async (userId: string, userRole: string) => {
  let result = null;
  if (userRole === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (userRole === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (userRole === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
