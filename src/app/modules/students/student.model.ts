import { Schema, model } from 'mongoose';

// ----------Imports for custom Static method
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.interface';

/*-------------- Example of setting required field with custom Error Message ------------ */
const studentNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required.'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required.'],
    trim: true,
  },
  fathersContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required.'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required.'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'user',
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Student name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender.',
      },
      required: [true, 'Gender is required.'],
      trim: true,
    },
    dateOfBirth: {
      type: String,
    },
    // String Validation Using `validator` library ---------------------
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group.',
      },
      required: [true, 'Blood group is required.'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required.'],
      trim: true,
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// -------------Create Mongoose Virtual property ---------
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

/* --------------- Query Middleware ------------------------- */
studentSchema.pre('find', function (next) {
  // Find all the documents which isDeleted property value is false
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Prevent showing single document which isDeleted property value is true
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Prevent showing single document using Aggregation Middleware
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create a custom static method -------------------------
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
