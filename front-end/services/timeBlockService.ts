import { TimeBlockInput } from '@types';
import { getToken } from '@utils/authUtils';
import { processEnv } from 'env/env';

const startTimeBlock = async (formData: TimeBlockInput) => {
    return await fetch(processEnv.getApiUrl() + `/timeblocks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(formData),
    });
};

const stopTimeBlock = async () => {
    return await fetch(processEnv.getApiUrl() + `/timeblocks`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const timeBlockService = {
    startTimeBlock,
    stopTimeBlock,
};
