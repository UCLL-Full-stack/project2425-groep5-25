import { processEnv } from 'env/env';

const getWorkWeekByDates = async (start: string, end: string) => {
    return await fetch(processEnv.getApiUrl() + `/workdays/${start}/${end}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
};

export const workDayService = {
    getWorkWeekByDates,
};
