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
export const studentValidationSchema = z.object({
  id: z.string().trim(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().trim(), // Assuming date is in string format
  email: z.string().email().trim(),
  contactNumber: z.string().trim(),
  emergencyContactNo: z.string().trim(),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(), // Assuming URLs for profile images
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});
