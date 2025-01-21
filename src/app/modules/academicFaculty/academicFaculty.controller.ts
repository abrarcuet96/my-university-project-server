import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.crteateAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
      academicFacultyId,
    );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB( req.query,);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic faculties are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;
  const body = req.body;
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    academicFacultyId,
    body,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});
const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const result =
    await AcademicFacultyServices.deleteAcademicFaculty(academicSemesterId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic faculty is deleted successfully',
    data: result,
  });
});
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
