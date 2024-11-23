const getDatabaseUrl = (): string => {
    const value = process.env.DATABASE_URL || 'default_url'; 
    return value;
};

const getAppPort = (): number => {
    const value = process.env.APP_PORT;
    const port = value ? parseInt(value, 10) : 3000;
    return isNaN(port) ? 3000 : port;
};

const getJwtSecret = (): string => {
    const value = process.env.JWT_SECRET || 'default_secret';
    return value;
};

const getJwtExpiresHours = (): number => {
    const value = process.env.JWT_EXPIRES_HOURS;
    const hours = value ? parseInt(value, 10) : 1;
    return isNaN(hours) ? 1 : hours;
};

export const processEnv = {
    getDatabaseUrl,
    getAppPort,
    getJwtSecret,
    getJwtExpiresHours,
};