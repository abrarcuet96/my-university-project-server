import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.crteateAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
      academicSemesterId,
    );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic Semesters are retrieved successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const body = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    academicSemesterId,
    body,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic Semesteris updated successfully',
    data: result,
  });
});
const deleteAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const result =
    await AcademicSemesterServices.deleteAcademicSemester(academicSemesterId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getSingleAcademicSemester,
  getAllAcademicSemesters,
  updateAcademicSemester,
  deleteAcademicSemester,
};
