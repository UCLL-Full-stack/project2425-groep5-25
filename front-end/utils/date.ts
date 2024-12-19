const getLocalCurrentDate = (): Date => {
    const currentDate = new Date();
    const timeZoneOffsetMinutes = currentDate.getTimezoneOffset();
    return new Date(currentDate.getTime() - timeZoneOffsetMinutes * 60 * 1000);
};

const formatDate = (date: Date): string => {
    const dateObj = new Date(date);
    return dateObj.toISOString().slice(11, 16);
};

const calcTimeBetween = (start: Date, end: Date): { hours: number; minutes: number } => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date');
    }

    const diffInMs = endDate.getTime() - startDate.getTime();
    if (diffInMs < 0) {
        throw new Error('Invalid duration');
    }

    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
};

const calcTimeBetweenString = (start: Date, end: Date): string => {
    const { hours, minutes } = calcTimeBetween(start, end);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

const getDate = (date: Date): number => {
    return new Date(date).getDate();
};

const getDayInitials = (date: Date): string => {
    const dateObj = new Date(date);
    const days = ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'];
    return days[dateObj.getDay()];
};

const numberToDateString = (decimalHours: number): string => {
    let hours = Math.floor(decimalHours);
    let minutes = Math.round((decimalHours - hours) * 60);
    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

const getStartAndEndOfWeek = (date: Date): { start: string; end: string } => {
    const startDate = new Date(date);
    const endDate = new Date(date);

    const dayOfWeek = startDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    startDate.setDate(startDate.getDate() + diffToMonday);
    endDate.setDate(startDate.getDate() + 4);

    return {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
    };
};

export const dateUtils = {
    getLocalCurrentDate,
    formatDate,
    calcTimeBetweenString,
    calcTimeBetween,
    getDate,
    getDayInitials,
    numberToDateString,
    getStartAndEndOfWeek,
};

export const formatWeekDisplay = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 'Invalid date range';

    const formatter = new Intl.DateTimeFormat('default', { month: 'long', year: 'numeric' });
    const formattedMonthYear = formatter.format(startDate);

    const capitalizedMonthYear =
        formattedMonthYear.charAt(0).toUpperCase() + formattedMonthYear.slice(1);

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    return `${capitalizedMonthYear} ${startDay} - ${endDay}`;
};
