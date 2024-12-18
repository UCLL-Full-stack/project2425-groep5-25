const getLocalCurrentDate = (): Date => {
    const currentDate = new Date();
    const timeZoneOffsetMinutes = currentDate.getTimezoneOffset();
    return new Date(currentDate.getTime() - timeZoneOffsetMinutes * 60 * 1000);
};

const getUTCStartOfDay = (date: Date): Date => {
    const startDate = new Date(date.getTime());
    startDate.setUTCHours(0, 0, 0, 0);
    return startDate;
};

const getUTCEndOfDay = (date: Date): Date => {
    const endDate = new Date(date.getTime());
    endDate.setUTCHours(23, 59, 59, 999);
    return endDate;
};

export const dateUtils = {
    getLocalCurrentDate,
    getUTCStartOfDay,
    getUTCEndOfDay,
};
