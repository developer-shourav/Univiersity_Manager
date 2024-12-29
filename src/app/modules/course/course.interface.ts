import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [];
  isDeleted?: boolean;
};
