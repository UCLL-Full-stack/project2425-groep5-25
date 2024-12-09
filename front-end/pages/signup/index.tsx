import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import router from 'next/router';
import React, { useState } from 'react';

const SignUp: React.FC = () => {
    const [error, setError] = useState<ErrorLabelMessage | null>(null);
    const handleSignUpSubmit = async (data: UserInput) => {
        console.log('Sign-up data submitted:', data);
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
            const [json] = await Promise.all([response.json()]);

            if (!response.ok) {
                setError({ message: json.message, label: 'error' });
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
                router.push('/login');
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
            <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
            {error && (
                <div className="bg-red-100 text-red-700 border border-red-400 p-4 rounded mb-4">
                    <p>{error.message}</p>
                </div>
            )}
            <LoginSignup type="signup" onSubmit={handleSignUpSubmit} />
        </div>
    );
};

export default SignUp;
