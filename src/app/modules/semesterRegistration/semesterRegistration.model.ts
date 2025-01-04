import { Schema } from 'zod';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { model } from 'mongoose';

const SemesterRegistrationSchema = new Schema<TSemesterRegistration>({});

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  SemesterRegistrationSchema,
);
