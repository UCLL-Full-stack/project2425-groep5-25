import { UnauthorizedError } from 'express-jwt';
import { TimeBlock } from '../model/timeBlock';
import { WorkDay } from '../model/workDay';
import { projectDb } from '../repository/project.db';
import { timeBlockDb } from '../repository/timeBlock.db';
import { userDb } from '../repository/user.db';
import { authorizeRole } from '../repository/utils/jwt';
import { workDayDb } from '../repository/workDay.db';
import { workScheduleDb } from '../repository/workSchedule.db';
import { JwtToken, TimeBlockInput } from '../types';

const getAllTimeBlocks = async (): Promise<TimeBlock[]> => {
    return timeBlockDb.getAllTimeBlocks();
};

const createTimeBlock = async ({
    auth,
    timeBlockInput,
}: {
    auth: JwtToken;
    timeBlockInput: TimeBlockInput;
}): Promise<TimeBlock> => {
    const { role, userId } = auth;
    const permissions = authorizeRole(role);
    const { projectId } = timeBlockInput;
    const startDate = new Date();

    if (!permissions.isAdmin && !permissions.isHr && !permissions.isUser) {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }

    const fUser = await userDb.getUserById({ id: userId });
    if (!fUser) throw new Error(`User with id <${userId}> does not exist.`);

    const fTimeBlock = await timeBlockDb.getRunningTimeBlockByUserId({ userId });
    if (fTimeBlock) throw new Error(`Userid <${userId}> is working on something.`);

    const fProject = await projectDb.getProjectById({ id: projectId });
    if (!fProject) throw new Error(`Project with id <${projectId}> doesn't exist.`);

    const fWorkSchedule = await workScheduleDb.getWorkScheduleByUserId({ userId });
    if (!fWorkSchedule) throw new Error(`Work schedule for user <${userId}> doesn't exist.`);

    let cWorkday;
    const fWorkDay = await workDayDb.getCurrentWorkDay({ date: startDate, userId });

    if (!fWorkDay) {
        const workDayStart = new Date(startDate.setHours(0, 0, 0, 0));
        const nWorkday = new WorkDay({
            date: workDayStart,
            expectedHours: fWorkSchedule.getHoursForDay(startDate),
            timeBlocks: [],
            user: fUser,
        });

        cWorkday = await workDayDb.createWorkDay(nWorkday);
    } else {
        cWorkday = fWorkDay;
    }

    const nTimeBlock = new TimeBlock({ startTime: startDate, project: fProject });
    return await timeBlockDb.createTimeBlock(nTimeBlock, cWorkday);
};

const updateTimeBlock = async ({ auth }: { auth: JwtToken }): Promise<TimeBlock> => {
    const { role, userId } = auth;
    const permissions = authorizeRole(role);

    if (!permissions.isAdmin && !permissions.isHr && !permissions.isUser) {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }

    const endDate = new Date();
    const fTimeBlock = await timeBlockDb.getRunningTimeBlockByUserId({ userId });
    if (!fTimeBlock) throw new Error(`Time block for userId <${userId}> doesn't exist.`);

    const uTimeBlock = new TimeBlock({
        id: fTimeBlock.getId(),
        startTime: fTimeBlock.getStartTime(),
        endTime: endDate,
        project: fTimeBlock.getProject(),
    });

    return await timeBlockDb.updateTimeBlock(uTimeBlock);
};

export const timeBlockService = {
    getAllTimeBlocks,
    createTimeBlock,
    updateTimeBlock,
};
