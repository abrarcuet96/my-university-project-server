import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Semester registration created successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'All semester registrations retrieved successfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id,
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Semester registration retrieved successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationsIntoDB(
      id,
      body,
    );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Semester registration updated successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
