import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { studentsSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(studentsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatesData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatesData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatesData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatesData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findByIdAndUpdate(id, modifiedUpdatesData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }
    const userId = deletedStudent.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
