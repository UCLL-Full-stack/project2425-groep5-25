import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import handleTokenInfo from 'hooks/handleTokenInfo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const { userRole, userName, userFullName, userToken } = handleTokenInfo();
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const handleLogin = async (data: UserInput) => {
        setErrorLabelMessage(undefined);

        try {
            const formData: UserInput = { userName: data.userName, passWord: data.passWord };
            const [userResponse] = await Promise.all([userService.loginUser(formData)]);
            const [userJson] = await Promise.all([userResponse.json()]);

            if (!userResponse.ok) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: userJson.message || t('error.unexpectedErrorMessage'),
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

            toast.success(t('pages.login.success'));

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('error.unexpectedErrorLabel'),
                    message: error.message || t('error.unexpectedErrorMessage'),
                });
            }
        }
    };

    return (
        <>
            <MainLayout title={t('pages.login.title')} description={t('pages.login.description')}>
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

export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
        },
    };
};

export default Login;
