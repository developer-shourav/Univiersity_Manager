import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

/* --------------Create a Semester Registration into Database---------- */
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // -----Check if there any registered semester that is already 'UPCOMING' | 'ONGOING' ------
  const isThereAnyUpcomingOrOnGoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOnGoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This is already an ${isThereAnyUpcomingOrOnGoingSemester?.status} registered semester!`,
    );
  }

  // -----Check if the semester is exist------
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester is not found!',
    );
  }

  // -----Check if the semester is already registered------
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester is already registered',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

/* --------------Get all Semester Registrations from Database---------- */
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fieldFiltering();

  const result = await semesterRegistrationQuery.queryModel;

  return result;
};

/* --------------Get A Semester Registration from Database---------- */
const getASemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById({ _id: id });
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration Not Found !!',
    );
  }

  return result;
};

/* --------------Update A Semester Registration ---------- */
const updateASemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // -----Check if the semester is already registered------
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Semester is not found');
  }

  // -----if the requested semester registration is ENDED, we will not update anything------
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const updateRequestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus} not possible to do ${updateRequestedStatus}`,
    );
  }

  // Status Flow: UPCOMING --> ONGOING --> ENDED

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    updateRequestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${updateRequestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    updateRequestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${updateRequestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getASemesterRegistrationFromDB,
  updateASemesterRegistrationIntoDB,
};
