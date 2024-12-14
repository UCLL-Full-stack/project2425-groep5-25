import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
            }, 2750);
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: 'Error',
                    message: error.message,
                });
            }
        }
    };

    return (
        <>
            <MainLayout title="Login" description="Time tracker login">
                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 p-2 max-w-md w-full">
                        <LoginSignup
                            isSignUp={false}
                            onSubmit={handleLogin}
                            clearParentErrors={() => setErrorLabelMessage(undefined)}
                        />
                        {errorLabelMessage && (
                            <ErrorMessage errorLabelMessage={errorLabelMessage} />
                        )}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default Login;
export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
