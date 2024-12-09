import { processEnv } from 'env/env';

const getWorkWeekByDates = async (start: string, end: string) => {
    return await fetch(processEnv.getApiUrl() + `/workdays/${start}/${end}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0Mywicm9sZSI6InVzZXIiLCJpYXQiOjE3MzM3NjExNjMsImV4cCI6MTczMzc4OTk2MywiaXNzIjoidGltZVRyYWNrZXJfYXBwIn0.cvwbZ_AGmTkgy8KsXHrzVnWCLtgDjWx2dZE0e68RCxQ',
            //  +
            // localStorage.getItem('token'),
        },
    });
};

export const workDayService = {
    getWorkWeekByDates,
};
