import { Schema, model } from 'mongoose';
import { FacultyModel, TFaculty, TFacultyName } from './faculty.interface';

// ----------Imports for custom Static method

/*-------------- Example of setting required field with custom Error Message ------------ */
const facultyNameSchema = new Schema<TFacultyName>({
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

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'user',
    },
    designation: {
      type: String,
    },
    name: {
      type: facultyNameSchema,
      required: [true, 'Faculty name is required.'],
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
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    contactNo: {
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
    profileImage: { type: String, default: '' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// -------------Create Mongoose Virtual property ---------
facultySchema.virtual('fullName').get(function () {
  const firstName = this?.name?.firstName;
  const middleName = this?.name?.middleName;
  const lastName = this?.name?.lastName;
  if (firstName && middleName && lastName) {
    return `${firstName} ${middleName} ${lastName}`;
  } else if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return '';
  }
});

/* --------------- Query Middleware ------------------------- */
facultySchema.pre('find', function (next) {
  // Find all the documents which isDeleted property value is false
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Prevent showing single document which isDeleted property value is true
facultySchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Prevent showing single document using Aggregation Middleware
facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create a custom static method -------------------------
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id, isDeleted: { $ne: false } });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
