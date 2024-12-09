import { processEnv } from 'env/env';

const getWorkWeekByDates = async (start: string, end: string) => {
    return await fetch(processEnv.getApiUrl() + `/workdays/${start}/${end}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJociIsImlhdCI6MTczMzc3NTkwOSwiZXhwIjoxNzMzODA0NzA5LCJpc3MiOiJ0aW1lVHJhY2tlcl9hcHAifQ.z-RULsN1R4ALSfo5cMerwn3p1E92p9K9n5gHoIXa6GQ', //+ localStorage.getItem('token'),
        },
    });
};

export const workDayService = {
    getWorkWeekByDates,
};
