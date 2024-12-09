import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import router from 'next/router';
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [error, setError] = useState<ErrorLabelMessage | null>(null);
    const handleLoginSubmit = async (data: UserInput) => {
        console.log('Login data submitted:', data);

        try {
            const formData: UserInput = { userName: data.userName, passWord: data.passWord };
            const [response] = await Promise.all([userService.loginUser(formData)]);
            const [json] = await Promise.all([response.json()]);

            if (!response.ok) {
                setError({ message: json.message, label: 'error' });
                console.log(error);
                return;
            }

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: json.token,
                    fullname: json.fullname,
                    username: json.username,
                    role: json.role,
                }),
            );

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            setError({
                message: 'An unexpected error occurred. Please try again.',
                label: 'error',
            });
        }
    };

    return (
        <div className="container mx-auto max-w-md p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            {error && (
                <div
                    className={`text-${error.label === 'error' ? 'red' : 'green'}-500 text-center mb-4`}>
                    {error.message}
                </div>
            )}
            <LoginSignup type="login" onSubmit={handleLoginSubmit} />
        </div>
    );
};

export default Login;
