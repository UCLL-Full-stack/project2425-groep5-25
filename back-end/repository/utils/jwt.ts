import jwt from 'jsonwebtoken';
import { processEnv } from '../../env/env';

const generateJwtToken = ({ userName, role }): string => {
    const options = { expiresIn: `${processEnv.getJwtExpiresHours()}h`, issuer: 'timeTracker_app' };
    try {
        return jwt.sign({ userName, role }, processEnv.getJwtSecret(), options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT. See server log for details.');
    }
};

export { generateJwtToken };
