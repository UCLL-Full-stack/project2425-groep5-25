export const formatTime = (date: Date | string): string => {
    const dateObj = new Date(date); // Ensure date is a Date object
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const calculateDuration = (start: Date | string, end: Date | string): string => {
    const startDate = new Date(start); // Convert start to a Date object if it's a string
    const endDate = new Date(end); // Convert end to a Date object if it's a string

    const diffInMs = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};
