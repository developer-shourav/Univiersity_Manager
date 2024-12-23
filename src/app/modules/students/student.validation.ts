import { z } from 'zod';

// Define Zod schemas for nested objects first
const userNameValidationSchema = z.object({
  firstName: z.string().trim().max(20),
  middleName: z.string().optional(),
  lastName: z.string().trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fathersContactNo: z.string().trim(),
  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim(),
});

// Define the main Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email().trim(),
      contactNumber: z.string().trim(),
      emergencyContactNo: z.string().trim(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().optional(), // Assuming URLs for profile images
      academicDepartment: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
