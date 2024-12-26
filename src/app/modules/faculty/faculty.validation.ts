import { z } from 'zod';

// Define Zod schemas for nested objects first
const facultyNameValidationSchema = z.object({
  firstName: z.string().max(20),
  middleName: z.string().optional(),
  lastName: z.string(),
});


// Define the main Faculty schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
    designation: z.string(),
      name: facultyNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      admissionSemester: z.string(),
      profileImage: z.string().optional(), // Assuming URLs for profile images
      academicDepartment: z.string(),
    }),
  }),
});

// Faculty update Validation Schema ----------
const updateFacultyNameValidationSchema = z.object({
  firstName: z.string().max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});


// Define the main Update Faculty schema
const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
    designation: z.string().optional(),
      name: updateFacultyNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      admissionSemester: z.string().optional(),
      profileImage: z.string().optional(), // Assuming URLs for profile images
      academicDepartment: z.string().optional(),
    }),
  }),
});


export const facultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
