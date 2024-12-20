import { getFullName, getLoggedInUser, getRole, getToken, getUserName } from '@utils/authUtils';
import { useEffect, useState } from 'react';

const handleTokenInfo = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userName, setUsername] = useState<string | null>(null);
    const [userFullName, setUserFullName] = useState<string | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        setUserRole(getRole());
        setUsername(getUserName());
        setUserFullName(getFullName());
        setUserToken(getToken());
    }, [getLoggedInUser()]);

    return {
        userRole,
        userName,
        userFullName,
        userToken,
    };
};

export default handleTokenInfo;
