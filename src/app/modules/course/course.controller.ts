import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course is created successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Courses are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await CourseServices.updateCourseIntoDB(id, body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course is updated successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course is deleted successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const faculties = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty is assigned to course successfully',
    data: result,
  });
});
const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const faculties = req.body;
  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty is removed from course successfully',
    data: result,
  });
});
export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  getFacultiesWithCourse,
};
