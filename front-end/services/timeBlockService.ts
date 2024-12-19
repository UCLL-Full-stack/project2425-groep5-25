import { TimeBlockInput } from '@types';
import { processEnv } from 'env/env';
import { getToken } from 'utils/authUtils';

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
