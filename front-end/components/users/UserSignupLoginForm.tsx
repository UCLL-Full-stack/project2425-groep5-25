import InputField from '@components/Selects/InputField';
import ErrorMessage from '@components/shared/ErrorMessage';
import { ErrorLabelMessage, UserInput } from '@types';
import React, { useState } from 'react';

type Props = {
    isSignUp: boolean;
    onSubmit: (data: UserInput, validate: boolean) => void;
};

const UserSignupLoginForm: React.FC<Props> = ({ isSignUp, onSubmit }: Props) => {
    const [userName, setUserName] = useState<string | null>('');
    const [passWord, setPassWord] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [firstName, setFirstName] = useState<string | null>('');
    const [lastName, setLastName] = useState<string | null>('');
    const [role, setRole] = useState<string | null>('');
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const validateUserName = (userName: string | null) => {
        if (!userName || userName?.trim().length < 6)
            return 'Username must be at least 6 characters long';
        return null;
    };

    const validatePassWord = (passWord: string | null) => {
        if (!passWord || passWord?.trim().length < 6)
            return 'PassWord must be at least 6 characters long';
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        // Als je het als boolean wilt behouden, doe maar zo. Zal het ook toespassen in sidepanel.
        const userNameError = validateUserName(userName);
        const passWordError = validatePassWord(passWord);

        if (userNameError || passWordError) {
            setErrorLabelMessage({
                label: 'Validation Error',
                message: userNameError || passWordError || '',
            });
            return false;
        }

        if (isSignUp) {
            //     if (!email?.trim()) {
            //         newErrors.email = 'Email is required';
            //         valid = false;
            //     }
            //     if (!firstName?.trim()) {
            //         newErrors.firstName = 'First name is required';
            //         valid = false;
            //     }
            //     if (!lastName?.trim()) {
            //         newErrors.lastName = 'Last name is required';
            //         valid = false;
            //     }
            //     if (!role?.trim()) {
            //         newErrors.role = 'Role is required';
            //         valid = false;
            //     }
            //
            // if (emailError || firstNameError) {
            //     setErrorLabelMessage({
            //         label: 'Validation Error',
            //         message: emailError || firstNameError || '',
            //     });
            //     return false;
            // }
        }

        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorLabelMessage(undefined);

        if (!validate()) {
            return;
        }

        const userData: UserInput = {
            userName,
            passWord,
            email,
            firstName,
            lastName,
            role,
        };

        onSubmit(userData, validate());
    };

    return (
        <>
            {/* Zet dit allemaan in 1 div */}
            <h3 className="px-0">{isSignUp ? 'Sign Up' : 'Login'}</h3>

            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    label="Username"
                    value={userName}
                    onChange={setUserName}
                    validate={validateUserName}
                    placeholder="Enter your username"
                    required // das default true als je geen value aan geeft
                    // required={true} == required
                    // Moet enkel false assigned aan bools.
                />

                <InputField
                    type="password"
                    label="Password"
                    value={passWord}
                    onChange={setPassWord}
                    validate={validatePassWord}
                    placeholder="Enter your password"
                    required // same here
                />

                {isSignUp && (
                    <>
                        <InputField
                            type="email"
                            label="Email"
                            value={email}
                            onChange={setEmail}
                            placeholder="Enter your email"
                            required={true}
                            validate={(value) => (!value ? 'Email is required' : null)}
                        />

                        <InputField
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            placeholder="Enter your first name"
                            required={true}
                            validate={(value) => (!value ? 'First name is required' : null)}
                        />

                        <InputField
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            placeholder="Enter your last name"
                            required={true}
                            validate={(value) => (!value ? 'Last name is required' : null)}
                        />

                        <InputField
                            type="text"
                            label="Role"
                            value={role}
                            onChange={setRole}
                            placeholder="Enter your role (e.g., Admin, User)"
                            required={true}
                            validate={(value) => (!value ? 'Role is required' : null)}
                        />
                    </>
                )}

                {/*
                    Check een classname, we hebben ergens well een generic button class.
                */}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>

                {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
            </form>
        </>
    );
};

export default UserSignupLoginForm;
