import jwt from 'jsonwebtoken';
import { processEnv } from '../../env/env';

const generateJwtToken = ({ username, role }: { username: string; role: string }): string => {
    const options = { expiresIn: `${processEnv.getJwtExpiresHours()}h`, issuer: 'timeTracker_app' };
    try {
        return jwt.sign({ username, role }, processEnv.getJwtSecret(), options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT. See server log for details.');
    }
};

export { generateJwtToken };