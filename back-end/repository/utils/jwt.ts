import jwt from 'jsonwebtoken';
import { processEnv } from '../../env/env';
import { GenerateJwtTokenInput } from '../../types';

const generateJwtToken = ({ userId, role }: GenerateJwtTokenInput) => {
    const options = { expiresIn: `${processEnv.getJwtExpiresHours()}h`, issuer: 'timeTracker_app' };
    try {
        return jwt.sign({ userId, role }, processEnv.getJwtSecret(), options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT. See server log for details.');
    }
};

export { generateJwtToken };
