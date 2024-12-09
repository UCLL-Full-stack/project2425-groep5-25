import jwt from 'jsonwebtoken';
import { processEnv } from '../../env/env';
import { JwtToken } from '../../types';

const generateJwtToken = ({ userId, role }: JwtToken) => {
    const options = { expiresIn: `${processEnv.getJwtExpiresHours()}h`, issuer: 'timeTracker_app' };
    try {
        return jwt.sign({ userId, role }, processEnv.getJwtSecret(), options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT. See server log for details.');
    }
};

export { generateJwtToken };
