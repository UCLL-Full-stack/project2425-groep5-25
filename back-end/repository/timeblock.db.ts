import { TimeBlock } from '../model/timeBlock';

const timeBlocks: TimeBlock[] = [
    new TimeBlock({
        id: 1,
        startTime: new Date('2024-10-29T08:00:00'),
        endTime: new Date('2024-10-29T10:00:00'),
    }),
    new TimeBlock({
        id: 2,
        startTime: new Date('2024-10-29T10:00:00'),
        endTime: new Date('2024-10-29T12:00:00'),
    }),
    new TimeBlock({
        id: 3,
        startTime: new Date('2024-10-30T09:00:00'),
        endTime: new Date('2024-10-30T11:00:00'),
    }),
];

const getTimeBlocks = (): TimeBlock[] => {
    return timeBlocks;
};

export default {
    getTimeBlocks,
};
