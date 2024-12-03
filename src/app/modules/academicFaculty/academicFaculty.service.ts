import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const crteateAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const AcademicFacultyServices = {
  crteateAcademicFacultyIntoDB,
  getSingleAcademicFacultyFromDB,
  getAllAcademicFacultiesFromDB,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
