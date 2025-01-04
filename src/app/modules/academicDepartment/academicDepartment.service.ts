import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const crteateAcademicDepartmentIntoDB = async (
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
const deleteAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};
export const AcademicDepartmentServices = {
  crteateAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentFromDB,
  getAllAcademicDepartmentsFromDB,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
