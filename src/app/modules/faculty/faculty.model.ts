import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';

const UserNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
  },
  { _id: false },
);

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    designation: { type: String, required: true },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: false },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: false,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String, default: '' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department is required'],
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty is required'],
      ref: 'AcademicFaculty',
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// Static method to check if a user exists
facultySchema.statics.isUserExists = async function (
  id: string,
): Promise<TFaculty | null> {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

// Export the model
const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);

export default Faculty;
