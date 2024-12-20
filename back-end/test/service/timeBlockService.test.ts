import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import { Project } from '../../model/project';
import { TimeBlock } from '../../model/timeBlock';
import { User } from '../../model/user';
import { WorkDay } from '../../model/workDay';
import { WorkSchedule } from '../../model/workSchedule';
import { projectDb } from '../../repository/project.db';
import { timeBlockDb } from '../../repository/timeBlock.db';
import { userDb } from '../../repository/user.db';
import { workDayDb } from '../../repository/workDay.db';
import { workScheduleDb } from '../../repository/workSchedule.db';
import { timeBlockService } from '../../service/timeBlock.service';
import { Color, JwtToken, Role, TimeBlockInput } from '../../types';
import { dateUtils } from '../../utils/date';

let mockGetUserById: jest.MockedFunction<typeof userDb.getUserById>;
let mockGetRunningTimeBlockByUserId: jest.MockedFunction<
    typeof timeBlockDb.getRunningTimeBlockByUserId
>;
let mockGetProjectById: jest.MockedFunction<typeof projectDb.getProjectById>;
let mockGetProjectsByUserId: jest.MockedFunction<typeof projectDb.getProjectsByUserId>;
let mockGetWorkScheduleByUserId: jest.MockedFunction<typeof workScheduleDb.getWorkScheduleByUserId>;
let mockGetCurrentWorkDay: jest.MockedFunction<typeof workDayDb.getCurrentWorkDay>;
let mockCreateWorkDay: jest.MockedFunction<typeof workDayDb.createWorkDay>;
let mockCreateTimeBlock: jest.MockedFunction<typeof timeBlockDb.createTimeBlock>;
let mockGetLocalCurrentDate: jest.MockedFunction<typeof dateUtils.getLocalCurrentDate>;
let mockGetUTCStartOfDay: jest.MockedFunction<typeof dateUtils.getUTCStartOfDay>;
let mockGetAllTimeBlocks: jest.MockedFunction<typeof timeBlockDb.getAllTimeBlocks>;
let mockUpdateTimeBlock: jest.MockedFunction<typeof timeBlockDb.updateTimeBlock>;

const cUser1 = new User({
    id: 1,
    userName: 'Yasir_DaBoss',
    firstName: 'Yasir',
    lastName: 'Hozan',
    email: 'yasir.hozan@example.com',
    passWord: '@Password123!',
    role: 'user' as Role,
});

const cUser2 = new User({
    id: 2,
    userName: 'Roel_DaBoss',
    firstName: 'Roel',
    lastName: 'Crabbé',
    email: 'roel.crabbe@example.com',
    passWord: '@Password123!',
    role: 'admin' as Role,
});

const defaultProject = new Project({
    id: 1,
    name: 'General',
    color: Color.Gray,
    users: [],
});

const updatedDefaultProject = new Project({
    id: 1,
    name: 'General',
    color: Color.Gray,
    users: [cUser1, cUser2],
});

const cProject5 = new Project({
    id: 5,
    name: 'Test22',
    color: Color.Gray,
    users: [cUser1],
});

const cProject3 = new Project({
    name: 'Test1234',
    color: Color.Orange,
    users: [cUser2],
});

const cProject2 = new Project({
    name: 'Test123',
    color: Color.Blue,
    users: [cUser2],
});

const startTime = new Date('2024-12-01 08:00:00');
const endTime = new Date('2024-12-01 10:00:00');

const cTimeBlock2 = new TimeBlock({ id: 1, startTime, endTime: undefined, project: cProject5 });
const cTimeBlock3 = new TimeBlock({ id: 1, startTime, endTime: undefined, project: cProject5 });
const mockSchedule = new WorkSchedule({
    mondayHours: 8,
    tuesdayHours: 8,
    wednesdayHours: 8,
    thursdayHours: 8,
    fridayHours: 8,
    saturdayHours: 0,
    sundayHours: 0,
    user: cUser1,
});

const cWorkDay1 = new WorkDay({
    expectedHours: 8,
    achievedHours: 7,
    date: startTime,
    user: cUser1,
    timeBlocks: [cTimeBlock2],
});

beforeEach(() => {
    mockUpdateTimeBlock = jest.fn();
    mockGetAllTimeBlocks = jest.fn();
    mockGetUserById = jest.fn();
    mockGetRunningTimeBlockByUserId = jest.fn();
    mockGetProjectById = jest.fn();
    mockGetProjectsByUserId = jest.fn();
    mockGetWorkScheduleByUserId = jest.fn();
    mockGetCurrentWorkDay = jest.fn();
    mockCreateWorkDay = jest.fn();
    mockCreateTimeBlock = jest.fn();
    mockGetLocalCurrentDate = jest.fn();
    mockGetUTCStartOfDay = jest.fn();

    timeBlockDb.updateTimeBlock = mockUpdateTimeBlock;
    timeBlockDb.getAllTimeBlocks = mockGetAllTimeBlocks;
    userDb.getUserById = mockGetUserById;
    timeBlockDb.getRunningTimeBlockByUserId = mockGetRunningTimeBlockByUserId;
    projectDb.getProjectById = mockGetProjectById;
    projectDb.getProjectsByUserId = mockGetProjectsByUserId;
    workScheduleDb.getWorkScheduleByUserId = mockGetWorkScheduleByUserId;
    workDayDb.getCurrentWorkDay = mockGetCurrentWorkDay;
    workDayDb.createWorkDay = mockCreateWorkDay;
    timeBlockDb.createTimeBlock = mockCreateTimeBlock;
    dateUtils.getLocalCurrentDate = mockGetLocalCurrentDate;
    dateUtils.getUTCStartOfDay = mockGetUTCStartOfDay;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a time block successfully', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { id: 1, projectId: 1 };
    const currentDate = new Date();

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(null);
    mockGetProjectById.mockResolvedValue(cProject5);
    mockGetProjectsByUserId.mockResolvedValue([cProject5]);
    mockGetWorkScheduleByUserId.mockResolvedValue(mockSchedule);
    mockGetCurrentWorkDay.mockResolvedValue(cWorkDay1);
    mockGetLocalCurrentDate.mockReturnValue(currentDate);
    mockGetUTCStartOfDay.mockReturnValue(new Date());
    //mockCreateWorkDay.mockResolvedValue(new WorkDay({ date: currentDate, timeBlocks: [] }));
    mockCreateTimeBlock.mockResolvedValue(cTimeBlock2);
    //when
    const result = await timeBlockService.createTimeBlock({
        auth: mockAuth,
        timeBlockInput: mockTimeBlockInput,
    });
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: mockTimeBlockInput.projectId });
    expect(mockGetProjectsByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetWorkScheduleByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetLocalCurrentDate).toHaveBeenCalledTimes(1);
    expect(mockCreateTimeBlock).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(TimeBlock);
});

test('should throw an error if user already has a running time block', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { projectId: 1 };

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(cTimeBlock2);
    //when
    //then
    await expect(
        timeBlockService.createTimeBlock({ auth: mockAuth, timeBlockInput: mockTimeBlockInput }),
    ).rejects.toThrowError('You are currently working on another timeBlock');

    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
});

test('should throw an error if project does not exist', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { projectId: 99 };

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(null);
    mockGetProjectById.mockResolvedValue(null);
    //when
    await expect(
        timeBlockService.createTimeBlock({ auth: mockAuth, timeBlockInput: mockTimeBlockInput }),
    ).rejects.toThrowError("Project with id <99> doesn't exist.");
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: mockTimeBlockInput.projectId });
});

test('should throw an error if user is not assigned to the project', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { projectId: 2 };

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(null);
    mockGetProjectById.mockResolvedValue(cProject2);
    mockGetProjectsByUserId.mockResolvedValue([]);
    //when
    await expect(
        timeBlockService.createTimeBlock({ auth: mockAuth, timeBlockInput: mockTimeBlockInput }),
    ).rejects.toThrowError('User <1> is not assigned to project <2>.');
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: mockTimeBlockInput.projectId });
    expect(mockGetProjectsByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
});

test('should throw an error if work schedule does not exist', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { projectId: 5 };

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(null);
    mockGetProjectById.mockResolvedValue(cProject5);
    mockGetProjectsByUserId.mockResolvedValue([cProject5]);
    mockGetWorkScheduleByUserId.mockImplementation(() => {
        throw new Error("Work schedule for user <1> doesn't exist.");
    });
    //when
    await expect(
        timeBlockService.createTimeBlock({ auth: mockAuth, timeBlockInput: mockTimeBlockInput }),
    ).rejects.toThrowError("Work schedule for user <1> doesn't exist.");
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetProjectById).toHaveBeenCalledWith({ id: mockTimeBlockInput.projectId });
    expect(mockGetProjectsByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetWorkScheduleByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
});

test('should throw an error if user does not exist', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { projectId: 1 };

    mockGetUserById.mockResolvedValue(null);
    //when
    await expect(
        timeBlockService.createTimeBlock({ auth: mockAuth, timeBlockInput: mockTimeBlockInput }),
    ).rejects.toThrowError(`User with id <${mockAuth.userId}> does not exist.`);
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
});

test('should throw an error if the user is not authorized', async () => {
    //given
    const mockAuth: JwtToken = { role: 'invalid_role' as Role, userId: 1 };
    const mockTimeBlockInput: TimeBlockInput = { projectId: 5 };

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(null);
    mockGetProjectById.mockResolvedValue(cProject5);
    mockGetProjectsByUserId.mockResolvedValue([cProject5]);
    //when
    //then
    await expect(
        timeBlockService.createTimeBlock({ auth: mockAuth, timeBlockInput: mockTimeBlockInput }),
    ).rejects.toThrowError('You are not authorized to access this resource.');
});

test('should return all time blocks successfully', async () => {
    //given
    const mockTimeBlocks: TimeBlock[] = [cTimeBlock2, cTimeBlock3];
    mockGetAllTimeBlocks.mockResolvedValue(mockTimeBlocks);
    //when
    const result = await timeBlockService.getAllTimeBlocks();
    //then
    expect(mockGetAllTimeBlocks).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTimeBlocks);
});

test('should update time block successfully', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };

    const mockRunningTimeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        project: cProject5,
    });

    const mockUpdatedTimeBlock = new TimeBlock({
        id: 1,
        startTime: mockRunningTimeBlock.getStartTime(),
        endTime: new Date('2024-12-01 10:00:00'),
        project: mockRunningTimeBlock.getProject(),
    });

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(mockRunningTimeBlock);
    mockGetLocalCurrentDate.mockReturnValue(new Date('2024-12-01 10:00:00'));
    mockUpdateTimeBlock.mockResolvedValue(mockUpdatedTimeBlock);
    //when
    const result = await timeBlockService.updateTimeBlock({ auth: mockAuth });
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
    expect(mockGetLocalCurrentDate).toHaveBeenCalledTimes(1);
    expect(mockUpdateTimeBlock).toHaveBeenCalledWith(mockUpdatedTimeBlock);
    expect(result).toEqual(mockUpdatedTimeBlock);
});

test('should throw an error if user is not authorized', async () => {
    //given
    const mockAuth: JwtToken = { role: 'guest' as Role, userId: 1 };
    //then
    await expect(timeBlockService.updateTimeBlock({ auth: mockAuth })).rejects.toThrowError(
        'You are not authorized to access this resource.',
    );
});

test('should throw an error if user does not exist', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };

    mockGetUserById.mockResolvedValue(null);
    //when
    await expect(timeBlockService.updateTimeBlock({ auth: mockAuth })).rejects.toThrowError(
        `User with id <${mockAuth.userId}> does not exist.`,
    );
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
});

test('should throw an error if no running time block exists', async () => {
    //given
    const mockAuth: JwtToken = { role: 'user', userId: 1 };

    mockGetUserById.mockResolvedValue(cUser1);
    mockGetRunningTimeBlockByUserId.mockResolvedValue(null);
    //when
    await expect(timeBlockService.updateTimeBlock({ auth: mockAuth })).rejects.toThrowError(
        'You are not working on anything.',
    );
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: mockAuth.userId });
    expect(mockGetRunningTimeBlockByUserId).toHaveBeenCalledWith({ userId: mockAuth.userId });
});
