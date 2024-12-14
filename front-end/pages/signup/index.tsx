import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const handleSignUp = async (data: UserInput) => {
        setErrorLabelMessage(undefined);

        try {
            const formData: UserInput = {
                userName: data.userName,
                passWord: data.passWord,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };
            const [userResponse] = await Promise.all([userService.signupUser(formData)]);
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

            toast.success(
                `You successfully created an account! You are now logged in! Redirecting you...`,
            );

            setTimeout(() => {
                router.push('/');
            }, 2750);
        } catch (error) {
            console.error('Login error:', error);
            setErrorLabelMessage({
                message: 'An unexpected error occurred. Please try again.',
                label: 'error',
            });
        }
    };

    return (
        <>
            <MainLayout title="Signup" description="Time tracker signup">
                <main className="container mx-auto max-w-md p-4">
                    <LoginSignup
                        isSignUp
                        onSubmit={handleSignUp}
                        clearParentErrors={() => setErrorLabelMessage(undefined)}
                    />
                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
                </main>
            </MainLayout>
        </>
    );
};

export default SignUp;
