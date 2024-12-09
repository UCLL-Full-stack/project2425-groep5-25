export const formatTime = (date: Date | string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDecimalTime = (decimalHours: number): string => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const calculateDuration = (start: Date | string, end: Date | string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMs = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const getStartAndEndOfWeek = (date: Date) => {
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

export const getDayName = (date: string | Date): string => {
    const dateObj = new Date(date);
    const days = ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'];
    return days[dateObj.getDay()];
};

export const getDateNumber = (date: string | Date): number => {
    return new Date(date).getDate();
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
