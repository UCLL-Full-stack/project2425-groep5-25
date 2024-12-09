import InputField from '@components/Selects/InputField';
import ErrorMessage from '@components/shared/ErrorMessage';
import styles from '@styles/home.module.css';
import { ErrorLabelMessage, UserInput } from '@types';
import React, { useState } from 'react';

type Props = {
    isSignUp: boolean;
    onSubmit: (data: UserInput, validate: boolean) => void;
};

const UserSignupLoginForm: React.FC<Props> = ({ isSignUp, onSubmit }: Props) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [passWord, setPassWord] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
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
    const validateEmail = (email: string | null) => {
        if (!email?.trim()) {
            return 'Email is required';
        }
        return null;
    };
    const validateFirstName = (firstName: string | null) => {
        if (!firstName?.trim()) {
            return 'First Name is required';
        }
        if (firstName[0] != firstName[0].toUpperCase()) {
            return 'First Name needs to start with a capital letter';
        }
        if (firstName.trim().length < 2) {
            return 'First Name needs to be at least 2 letters';
        }
        return null;
    };
    const validateLastName = (lastName: string | null) => {
        if (!lastName?.trim()) {
            return 'Last Name is required';
        }
        if (lastName[0] != lastName[0].toUpperCase()) {
            return 'Last Name needs to start with a capital letter';
        }
        if (lastName.trim().length < 2) {
            return 'Last Name needs to be at least 2 letters';
        }
        return null;
    };
    const validateRole = (role: string | null) => {
        if (!role?.trim()) {
            return 'Role is required';
        }
        if (role.trim().length < 2) {
            return 'Role needs to be at least 2 letters';
        }
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

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
            const emailError = validateEmail(email);
            const firstNameError = validateFirstName(firstName);
            const lastNameError = validateLastName(lastName);
            const roleError = validateRole(role);

            if (emailError || firstNameError || lastNameError || roleError) {
                setErrorLabelMessage({
                    label: 'Validation Error',
                    message: emailError || firstNameError || lastNameError || roleError || '',
                });
                return false;
            }
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
            userName: userName!,
            passWord: passWord!,
            email: email!,
            firstName: firstName!,
            lastName: lastName!,
            role: role!,
        };

        onSubmit(userData, validate());
    };

    return (
        <div className={styles.main}>
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
                            validate={validateEmail}
                        />

                        <InputField
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            placeholder="Enter your first name"
                            required
                            validate={validateFirstName}
                        />

                        <InputField
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            placeholder="Enter your last name"
                            required
                            validate={validateLastName}
                        />

                        <InputField
                            type="text"
                            label="Role"
                            value={role}
                            onChange={setRole}
                            placeholder="Enter your role (e.g., Admin, User)"
                            required
                            validate={validateRole}
                        />
                    </>
                )}

                <button type="submit" className={styles.button}>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>

                {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
            </form>
        </div>
    );
};

export default UserSignupLoginForm;
