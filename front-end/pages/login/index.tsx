import ErrorMessage from '@components/shared/ErrorMessage';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import Head from 'next/head';
import router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const handleLogin = async (data: UserInput) => {
        setErrorLabelMessage(undefined);

        try {
            const formData: UserInput = { userName: data.userName, passWord: data.passWord };
            const [userResponse] = await Promise.all([userService.loginUser(formData)]);
            const [userJson] = await Promise.all([userResponse.json()]);

            if (!userResponse.ok) {
                setErrorLabelMessage({
                    label: 'Backend Error',
                    message: userJson.message || 'An error occurred while logging in.',
                });
                return;
            }

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: userJson.token,
                    fullname: userJson.fullName,
                    username: userJson.userName,
                    role: userJson.role,
                }),
            );

            toast.success(`You successfully logged in! Redirecting you...`);

            setTimeout(() => {
                router.push('/');
            }, 3000);
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
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Time tracker login" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto max-w-md p-4">
                <LoginSignup
                    isSignUp={false}
                    onSubmit={handleLogin}
                    clearParentErrors={() => setErrorLabelMessage(undefined)}
                />
                {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
            </div>
        </>
    );
};

export default Login;
