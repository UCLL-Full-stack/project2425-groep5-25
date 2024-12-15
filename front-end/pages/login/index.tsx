import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const handleLogin = async (data: UserInput) => {
        setErrorLabelMessage(undefined);

        try {
            const formData: UserInput = { userName: data.userName, passWord: data.passWord };
            const [userResponse] = await Promise.all([userService.loginUser(formData)]);
            const [userJson] = await Promise.all([userResponse.json()]);

            if (!userResponse.ok) {
                setErrorLabelMessage({
                    label: t('error.backendErrorLabel'),
                    message: userJson.message || t('general.error'),
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

            toast.success(t('login.successMessage'));

            setTimeout(() => {
                router.push('/');
            }, 2750);
        } catch (error) {
            if (error instanceof Error) {
                setErrorLabelMessage({
                    label: t('error.genericErrorLabel'),
                    message: error.message,
                });
            }
        }
    };
    const testUsers = [
        { username: 'test user', password: 'test password' },
        { username: 'test hr', password: 'test password' },
        { username: 'test admin', password: 'test password' },
    ];
    const copyToClipboard = (text: string) => {
        const textToCopy = `${text}`;
        navigator.clipboard.writeText(textToCopy);
    };

    return (
        <>
            <MainLayout title={t('login.title')} description={t('login.description')}>
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
                {/* Table for Test Users */}
                <div className="p-4 mt-6 bg-gray-700 rounded-md">
                    <h3 className="text-white text-xl font-semibold mb-4">Test Users</h3>
                    <table className="min-w-full table-auto border-collapse text-white">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold">
                                    Username
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold">
                                    Password
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {testUsers.map((user, index) => (
                                <tr key={index} className="bg-gray-500 hover:bg-gray-600">
                                    <td className="px-4 py-2 text-sm flex items-center justify-between">
                                        {user.username}
                                        <FaCopy
                                            onClick={() => copyToClipboard(user.username)}
                                            className="cursor-pointer text-transparent border border-gray-300 rounded-md hover:border-white p-1 ml-4"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-sm flex items-center justify-between">
                                        {user.password}
                                        <FaCopy
                                            onClick={() => copyToClipboard(user.password)}
                                            className="cursor-pointer text-transparent border border-gray-300 rounded-md hover:border-white p-1 ml-4"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Login;
