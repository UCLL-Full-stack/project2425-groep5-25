import { processEnv } from 'env/env';

const getCurrentWorkWeek = async () => {
    return await fetch(processEnv.getApiUrl() + `/timeblocks/week`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzMiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MzM1MTgxODgsImV4cCI6MTczMzU0Njk4OCwiaXNzIjoidGltZVRyYWNrZXJfYXBwIn0.lIDsRUnQu3TmVSpTQT_wl89aHBuV5p67ZZryAbfFTp8`,
        },
    });
};

export const timeBlockService = {
    getCurrentWorkWeek,
};
