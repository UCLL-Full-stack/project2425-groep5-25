import { useEffect, useState } from 'react';
import { getFullName, getRole, getToken, getUserName } from 'utils/authUtils';

const userTokenInfo = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userName, setUsername] = useState<string | null>(null);
    const [userFullName, setUserFullName] = useState<string | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        setUserRole(getRole());
        setUsername(getUserName());
        setUserFullName(getFullName());
        setUserToken(getToken());
    }, []);

    return {
        userRole,
        userName,
        userFullName,
        userToken,
    };
};

export default userTokenInfo;
