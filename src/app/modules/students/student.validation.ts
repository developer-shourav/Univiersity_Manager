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

// Update Validation Schema
const updateUserNameValidationSchema = z.object({
  firstName: z.string().trim().max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().trim().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fathersContactNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(),
  motherOccupation: z.string().trim().optional(),
  motherContactNo: z.string().trim().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

// Define the main Update Student schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().trim().optional(),
      contactNumber: z.string().trim().optional(),
      emergencyContactNo: z.string().trim().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      admissionSemester: z.string().optional(),
      profileImage: z.string().optional(), // Assuming URLs for profile images
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
