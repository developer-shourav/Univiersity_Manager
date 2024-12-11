import { Schema, model } from 'mongoose';
// import validator from 'validator';

// ----------Imports for custom instance method
/* import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  TUserName,
} from './student.interface';
 */

// ----------Imports for custom Static method
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.interface';

import bcrypt from 'bcrypt';
import config from '../../config';

/*-------------- Example of setting required field with custom Error Message ------------ */
const studentNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    // Create Custom Validator Function ------------------
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    // String Validation Using `validator` library ---------------------
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
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
    password: {
      type: String,
      required: [true, 'Password is required.'],
      maxlength: [20, 'Password max length is 20'],
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
      required: [true, 'Date of birth is required.'],
    },
    // String Validation Using `validator` library ---------------------
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email',
      // },
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
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status.',
      },
      default: 'active',
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
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

/* --------------- Document Middleware ------------------------- */

// -------pre save middleware / hook : It will work when student create or save
studentSchema.pre('save', async function (next) {
  // console.log(this.name, 'pre hook: We will save the data');

  // Hashing The password and save into the DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // `this` is actually our document

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// ---------post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
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

/*
// Create a custom instance method -------------------------
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}; 
*/

// Create a custom static method -------------------------
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
