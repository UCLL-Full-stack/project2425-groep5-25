import ErrorMessage from '@components/shared/ErrorMessage';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import router from 'next/router';
import React, { useState } from 'react';

const SignUp: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();
    const handleSignUpSubmit = async (data: UserInput) => {
        console.log('Sign-up data submitted:', data);
        setErrorLabelMessage(undefined);
        try {
            const formData: UserInput = {
                userName: data.userName,
                passWord: data.passWord,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
            };
            const [response] = await Promise.all([userService.signupUser(formData)]);
            const [userJson] = await Promise.all([response.json()]);

            if (!response.ok) {
                setErrorLabelMessage({ message: userJson.message, label: 'Backend Error' });
                setTimeout(() => {
                    setErrorLabelMessage(undefined);
                }, 2000);
                return;
            }

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: userJson.token,
                    fullname: userJson.fullname,
                    username: userJson.username,
                    role: userJson.role,
                }),
            );
            localStorage.setItem('token', userJson.token);

            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            setErrorLabelMessage({
                message: 'An unexpected error occurred. Please try again.',
                label: 'error',
            });
        }
    };

    return (
        <div className="container mx-auto max-w-md p-4">
            <LoginSignup isSignUp onSubmit={handleSignUpSubmit} />
            {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
        </div>
    );
};

export default SignUp;
