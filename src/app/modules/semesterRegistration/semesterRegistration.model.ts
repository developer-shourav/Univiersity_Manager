import { SemesterRegistrationUpdateStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { model, Schema } from 'mongoose';

const SemesterRegistrationSchema = new Schema<TSemesterRegistration>(
  { academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'AcademicSemester'
  },
  status: {
    type: String,
    enum: SemesterRegistrationUpdateStatus,
    default: 'UPCOMING',
  },
  startDate: {
    type: Date, 
    required: true,
  },
  endData: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    default: 3,
  },
  maxCredit: {
    type: Number,
    default: 15,
  }
 },
 {
  timestamps: true,
 },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  SemesterRegistrationSchema,
);
