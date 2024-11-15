// import { ProjectDto, TimeBlockDto, UserDto, WorkDayDto, WorkScheduleDto } from '../dto';
// import { Project } from '../model/project';
// import { TimeBlock } from '../model/timeBlock';
// import { User } from '../model/user';
// import { WorkDay } from '../model/workDay';
// import { WorkSchedule } from '../model/workSchedule';

// // Todo: Refactor and use a real mapperService extension

// export const mapTimeBlock = (timeBlock: TimeBlock): TimeBlockDto => {
//     return new TimeBlockDto({
//         id: timeBlock.getId(),
//         startTime: timeBlock.getStartTime(),
//         endTime: timeBlock.getEndTime(),
//         projectId: timeBlock.getProject()?.getId(),
//     });
// };

// export const mapWorkDay = (workDay: WorkDay): WorkDayDto => {
//     return new WorkDayDto({
//         id: workDay.getId(),
//         expectedHours: workDay.getExpectedHours(),
//         achievedHours: workDay.getAchievedHours(),
//         date: workDay.getDate(),
//         userId: workDay.getUser().getId(),
//         timeBlocks: workDay.getTimeBlocks()?.map(mapTimeBlock) || [],
//     });
// };

// export const mapUser = (user: User): UserDto => {
//     return new UserDto({
//         id: user.getId(),
//         username: user.getUserName(),
//         firstName: user.getFirstName(),
//         lastName: user.getLastName(),
//         email: user.getEmail(),
//         role: user.getRole(),
//         workDays: user.getWorkDays()?.map(mapWorkDay),
//         workSchedule: mapWorkSchedule(user.getWorkSchedule()),
//     });
// };

// export const mapProject = (project: Project): ProjectDto => {
//     const usersDto = project.getUsers()?.map(mapUser) || [];
//     return new ProjectDto({
//         id: project.getId(),
//         name: project.getName(),
//         color: project.getColor(),
//         users: usersDto,
//     });
// };

// export const mapWorkSchedule = (workSchedule: WorkSchedule): WorkScheduleDto => {
//     return new WorkScheduleDto({
//         id: workSchedule.getId(),
//         userId: workSchedule.getUser().getId(),
//         mondayHours: workSchedule.getMondayHours(),
//         tuesdayHours: workSchedule.getTuesdayHours(),
//         wednesdayHours: workSchedule.getWednesdayHours(),
//         thursdayHours: workSchedule.getThursdayHours(),
//         fridayHours: workSchedule.getFridayHours(),
//         saturdayHours: workSchedule.getSaturdayHours(),
//         sundayHours: workSchedule.getSundayHours(),
//     });
// };
