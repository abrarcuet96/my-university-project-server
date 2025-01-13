import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  //   check if there any registered semester that is already 'UPCOMING' or 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      StatusCodes.BAD_GATEWAY,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }
  // check if the semester is exist:
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'This academic semester not found',
    );
  }
  // check if the semester is already registered:
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This asemester is already registered',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterregistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterregistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationsIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if he requested registered semester is exists:
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This asemester is not found');
  }
  // if the rquested semester registration is ended, we will not update anything:
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationsIntoDB,
};
