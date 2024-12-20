import jwt from 'jsonwebtoken';
import { processEnv } from '../../env/env';
import { JwtToken, Role } from '../../types';

const generateJwtToken = ({ userId, role }: JwtToken) => {
    const options = { expiresIn: `${processEnv.getJwtExpiresHours()}h`, issuer: 'timeTracker_app' };
    try {
        return jwt.sign({ userId, role }, processEnv.getJwtSecret(), options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT. See server log for details.');
    }
};

const authorizeRole = (role: Role) => {
    switch (role) {
        case 'admin':
            return { isAdmin: true, isHr: false, isUser: false };
        case 'hr':
            return { isAdmin: false, isHr: true, isUser: false };
        case 'user':
            return { isAdmin: false, isHr: false, isUser: true };
        default:
            return { isAdmin: false, isHr: false, isUser: false };
    }
};

const isValidRole = (role: Role): boolean => {
    const validRoles: Role[] = ['admin', 'user', 'hr'];
    return validRoles.includes(role);
};

export { authorizeRole, generateJwtToken, isValidRole };
