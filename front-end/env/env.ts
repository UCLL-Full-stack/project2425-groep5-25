const getApiUrl = (): string => {
    const value = process.env.API_PORT;
    const port = value ? parseInt(value, 10) : 3000;
    const url = isNaN(port) ? `http://localhost:3000` : `http://localhost:${port}`;
    return url;
};

export const processEnv = {
    getApiUrl
};