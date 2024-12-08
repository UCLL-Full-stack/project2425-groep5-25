import ErrorMessage from '@components/shared/ErrorMessage';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import router from 'next/router';
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const handleLogin = async (data: UserInput, validate: boolean) => {
        try {
            setErrorLabelMessage(undefined);

            if (!validate) return;
            const formData: UserInput = { userName: data.userName, passWord: data.passWord };
            const [userResponse] = await Promise.all([userService.loginUser(formData)]);
            const [userJson] = await Promise.all([userResponse.json()]);

            if (!userResponse.ok)
                throw new Error(
                    userJson.message || 'An error occurred while creating the project.',
                );

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: userJson.token,
                    fullname: userJson.fullname,
                    username: userJson.username,
                    role: userJson.role,
                }),
            );

            // Steek token in een local storage appart ook, want we gebruiken die zo!
            // const getAllUsersIdName = async () => {
            //     return await fetch(processEnv.getApiUrl() + `/users/id-name`, {
            //         method: 'GET',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             Authorization: 'Bearer ' + localStorage.getItem('token'),
            //         },
            //     });
            // };

            setTimeout(() => {
                router.push('/');
            }, 2000);

            // Je redirect na 2s. Maar je toont geen succes message ofzo.
            // Maar een succes message. Bvb:
            // toast.success(
            //     `User was authenticated successfully!`,
            // );
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: 'Validation Error',
                    message: error.message,
                });
            }
        }
    };

    return (
        // Fix css, geen titel meer nodig, je hebt in component al gedefinieerd. Anders doe 1 weg
        <div className="container mx-auto max-w-md p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            <LoginSignup isSignUp={false} onSubmit={handleLogin} />
            {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
        </div>
    );
};

export default Login;
