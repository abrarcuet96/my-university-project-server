import { model, Schema } from 'mongoose';
import {
  TCourse,
  TcourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';
const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});
const courseFacultySchema = new Schema<TcourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Course',
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});
export const Course = model<TCourse>('Course', courseSchema);
export const CourseFaculty = model<TcourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
