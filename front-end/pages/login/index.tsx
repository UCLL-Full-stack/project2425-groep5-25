import ErrorMessage from '@components/shared/ErrorMessage';
import LoginSignup from '@components/users/UserSignupLoginForm';
import { userService } from '@services/userService';
import { ErrorLabelMessage, UserInput } from '@types';
import router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const handleLogin = async (data: UserInput, validate: boolean) => {
        setErrorLabelMessage(undefined); //setError momenteel geeft geen updated value mee wss omdat het async is functie is vraag ?
        if (!validate) {
            console.log(errorLabelMessage?.message);

            return;
        }

        try {
            setErrorLabelMessage(undefined);

            const formData: UserInput = { userName: data.userName, passWord: data.passWord };
            const [userResponse] = await Promise.all([userService.loginUser(formData)]);
            const [userJson] = await Promise.all([userResponse.json()]);

            if (!userResponse.ok) {
                // Show backend error and clear it after 3 seconds
                setErrorLabelMessage({
                    label: 'Backend Error',
                    message: userJson.message || 'An error occurred while logging in.',
                });

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

            // Steek token in een local storage appart ook, want we gebruiken die zo! == DONE
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

            // Je redirect na 2s. Maar je toont geen succes message ofzo.== DONE
            // Maar een succes message. Bvb:
            toast.success(`User was authenticated successfully!`);
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
        // Fix css, geen titel meer nodig, je hebt in component al gedefinieerd. Anders doe 1 weg == DONE
        <div className="container mx-auto max-w-md p-4">
            <LoginSignup isSignUp={false} onSubmit={handleLogin} />
            {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
        </div>
    );
};

export default Login;
