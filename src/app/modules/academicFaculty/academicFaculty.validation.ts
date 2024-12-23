import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
      })
      .optional(),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
      })
      .optional(),
  }),
});

export const AcademicFacultyVAlidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
