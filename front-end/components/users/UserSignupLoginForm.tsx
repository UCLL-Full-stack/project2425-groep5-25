import InputField from '@components/selects/InputField';
import ErrorMessage from '@components/shared/ErrorMessage';
import styles from '@styles/home.module.css';
import { ErrorLabelMessage, UserInput } from '@types';
import React, { useState } from 'react';

type Props = {
    isSignUp: boolean;
    onSubmit: (data: UserInput) => void;
    clearParentErrors: () => void;
};

const UserSignupLoginForm: React.FC<Props> = ({ isSignUp, onSubmit, clearParentErrors }: Props) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [passWord, setPassWord] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();

    const validateFirstName = (firstName: string | null) => {
        if (!firstName?.trim()) return 'First name is required';
        if (firstName.trim().length < 2) return 'First name needs to be at least 2 letters';
        if (firstName[0] !== firstName[0].toUpperCase())
            return 'First name needs to start with a capital letter';
        if (!/^[\p{L}]+$/u.test(firstName))
            return 'First name can only contain letters (including accented characters)';
        return null;
    };

    const validateLastName = (lastName: string | null) => {
        if (!lastName?.trim()) return 'Last name is required';
        if (lastName.trim().length < 2) return 'Last name needs to be at least 2 letters';
        if (lastName[0] !== lastName[0].toUpperCase())
            return 'Last name needs to start with a capital letter';
        if (!/^[\p{L}]+$/u.test(lastName))
            return 'Last name can only contain letters (including accented characters)';
        return null;
    };

    const validateEmail = (email: string | null) => {
        if (!email?.trim()) return 'Email is required';
        if (!email.includes('@')) return 'Email must contain "@" symbol';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email format is invalid';
        return null;
    };

    const validateUserName = (userName: string | null) => {
        if (!userName?.trim()) return 'Username is required';
        if (userName.trim().length < 6) return 'Username must be at least 6 characters long';
        if (!/^[a-zA-Z0-9_]+$/.test(userName))
            return 'Username can only contain letters, numbers, and underscores';
        return null;
    };

    const validatePassWord = (passWord: string | null) => {
        if (!passWord?.trim()) return 'Password is required';
        if (passWord.trim().length < 6) return 'Password must be at least 6 characters long';
        if (!/[A-Z]/.test(passWord)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(passWord)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(passWord)) return 'Password must contain at least one number';
        if (!/[@$!%*?&#]/.test(passWord))
            return 'Password must contain at least one special character (@, $, !, %, *, ?, & or #)';
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        if (isSignUp) {
            const firstNameError = validateFirstName(firstName);
            const lastNameError = validateLastName(lastName);
            const emailError = validateEmail(email);

            if (firstNameError || lastNameError || emailError) {
                setErrorLabelMessage({
                    label: 'Validation Error',
                    message: firstNameError || lastNameError || emailError || '',
                });
                valid = false;
            }
        }

        const userNameError = validateUserName(userName);
        const passWordError = validatePassWord(passWord);

        if (userNameError || passWordError) {
            setErrorLabelMessage({
                label: 'Validation Error',
                message: userNameError || passWordError || '',
            });
            valid = false;
        }

        return valid;
    };

    const clearAllErrors = () => {
        clearParentErrors();
        setErrorLabelMessage(undefined);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearAllErrors();

        if (!validate()) {
            return;
        }

        const userData: UserInput = {
            userName: userName!,
            passWord: passWord!,
            ...(isSignUp && {
                email: email!,
                firstName: firstName!,
                lastName: lastName!,
            }),
        };

        onSubmit(userData);
    };

    return (
        <div className={styles.main}>
            <h3 className="px-0">{isSignUp ? 'Sign Up' : 'Login'}</h3>

            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        <InputField
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            validate={validateFirstName}
                            placeholder="Enter your first name"
                            required
                        />

                        <InputField
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            validate={validateLastName}
                            placeholder="Enter your last name"
                            required
                        />

                        <InputField
                            type="email"
                            label="Email"
                            value={email}
                            onChange={setEmail}
                            validate={validateEmail}
                            placeholder="Enter your email"
                            required
                        />
                    </>
                )}

                <InputField
                    type="text"
                    label="Username"
                    value={userName}
                    onChange={setUserName}
                    validate={validateUserName}
                    placeholder="Enter your username"
                    required
                />

                <InputField
                    type="password"
                    label="Password"
                    value={passWord}
                    onChange={setPassWord}
                    validate={validatePassWord}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit" className={styles.button}>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>

                {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
            </form>
        </div>
    );
};

export default UserSignupLoginForm;
