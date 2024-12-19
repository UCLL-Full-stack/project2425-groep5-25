import { processEnv } from 'env/env';
import { getToken } from 'utils/authUtils';

const getWorkWeekByDates = async (start: string, end: string) => {
    return fetch(processEnv.getApiUrl() + `/workdays/${start}/${end}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const workDayService = {
    getWorkWeekByDates,
};
