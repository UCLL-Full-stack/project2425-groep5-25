export type SimpleTimeBlock = {
    startTime: Date;
    endTime: Date;
};

export const calculateAchievedHours = (timeBlocks: SimpleTimeBlock[]): number => {
    return timeBlocks.reduce((total, block) => {
        const diffInMs = block.endTime.getTime() - block.startTime.getTime();
        return total + diffInMs / (1000 * 60 * 60);
    }, 0);
};
