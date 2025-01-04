import { z } from 'zod';
// UserName ValidationSchema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'Max allowed length is 20')
    .min(1, 'First name is required')
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

// Guardian ValidationValidationSchema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// Local Guardian ValidationValidationSchema
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'Max allowed length is 20')
    .min(1, 'First name is required')
    .trim()
    .optional(),
  middleName: z.string().trim().optional().optional(),
  lastName: z.string().min(1, 'Last name is required').trim().optional(),
});

// Guardian ValidationValidationSchema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required").optional(),
  fatherOccupation: z
    .string()
    .min(1, "Father's occupation is required")
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, "Father's contact number is required")
    .optional(),
  motherName: z.string().min(1, "Mother's name is required").optional(),
  motherOccupation: z
    .string()
    .min(1, "Mother's occupation is required")
    .optional(),
  motherContactNo: z
    .string()
    .min(1, "Mother's contact number is required")
    .optional(),
});

// Local Guardian ValidationValidationSchema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required").optional(),
  occupation: z
    .string()
    .min(1, "Local guardian's occupation is required")
    .optional(),
  contactNo: z
    .string()
    .min(1, "Local guardian's contact number is required")
    .optional(),
  address: z.string().min(1, "Local guardian's address is required").optional(),
});

// Main Student ValidationValidationSchema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female'], {
        errorMap: () => ({ message: 'Gender must be either Male or Female' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      contactNumber: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional()
        .or(z.undefined()),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z
        .enum(['Male', 'Female'], {
          errorMap: () => ({ message: 'Gender must be either Male or Female' }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required')
        .optional(),
      contactNumber: z.string().min(1, 'Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional()
        .or(z.undefined())
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImage: z.string().optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
