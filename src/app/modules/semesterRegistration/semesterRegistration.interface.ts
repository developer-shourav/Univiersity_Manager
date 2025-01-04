import { Types } from "mongoose";

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING'| 'ONGOING'| 'ENDED';
    startDate: Date;
    endData: Date;
    minCredit: number;
    maxCredit: number;
};
