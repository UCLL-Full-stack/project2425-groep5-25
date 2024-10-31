import { Project } from '../model/project';
import { TimeBlock } from '../model/timeblock';
import { WorkDay } from '../model/workDay';
import { User } from '../model/user';
import timeBlockRepository from '../repository/timeblock.db';
import workDayDb from '../repository/workDay.db';
import projectDb from '../repository/project.db';
import userRepository from '../repository/user.db';

const getAllTimeBlocks = (): TimeBlock[] => timeBlockRepository.getTimeBlocks();

const createTimeBlock = async ({ projectId, userId }: { projectId: number; userId: number }): Promise<TimeBlock> => {

    const user = await userRepository.getUserById({id:userId});
    if (!user) throw new Error("User not found");
    const project = user.getProjects().find(proj => proj.getId() === projectId);
    if (!project) throw new Error("Project not found");

    // 2. Validate that the user is associated with the project
    //if (!project.getUsers().some((u:User) => u.getId() === user.getId())) {
       // throw new Error("User is not associated with this project.");
   // }

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    if (userId === undefined) {
        throw new Error("User ID is not defined");
    }
    
    let workDay = workDayDb.getWorkDayByDateAndUser(today, userId);

    if (!workDay) {
     
        workDay = new WorkDay({
            id: undefined,
            expectedHours: 8,  // Default expected hours
            achievedHours: 0,
            date: today,
            user: user,
            timeBlocks: []
        });
        workDay = await workDayDb.createWorkDay(workDay);  // Save the new WorkDay to the database
    }

 
    const timeBlock = new TimeBlock({
        startTime: new Date(), 
        endTime: undefined,     
        project: project,
        workday: workDay,
    });

 
    const savedTimeBlock = timeBlockRepository.createTimeBlocks(timeBlock);

    // 7. Add the TimeBlock to the WorkDay and update achieved hours if needed
    //workDay.addTimeBlock(savedTimeBlock);
   // await workDayRepository.updateWorkDay(workDay);

    return savedTimeBlock;
}

export default { getAllTimeBlocks, createTimeBlock };
