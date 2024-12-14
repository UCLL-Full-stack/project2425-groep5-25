import ErrorMessage from '@components/layout/ErrorMessage';
import InputField from '@components/shared/InputField';
import { ErrorLabelMessage, UserInput } from '@types';
import { useTranslation } from 'next-i18next';
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
    const { t } = useTranslation();

    const validateFirstName = (firstName: string | null) => {
        if (!firstName?.trim()) return t('signup.validate.firstName.required');
        if (firstName.trim().length < 2) return t('signup.validate.firstName.minLength');
        if (firstName[0] !== firstName[0].toUpperCase())
            return t('signup.validate.firstName.capital');
        if (!/^[\p{L}]+$/u.test(firstName)) return t('signup.validate.firstName.lettersOnly');
        return null;
    };

    const validateLastName = (lastName: string | null) => {
        if (!lastName?.trim()) return t('signup.validate.lastName.required');
        if (lastName.trim().length < 2) return t('signup.validate.lastName.minLength');
        if (lastName[0] !== lastName[0].toUpperCase()) return t('signup.validate.lastName.capital');
        if (!/^[\p{L}]+$/u.test(lastName)) return t('signup.validate.lastName.lettersOnly');
        return null;
    };

    const validateEmail = (email: string | null) => {
        if (!email?.trim()) return t('signup.validate.email.required');
        if (!email.includes('@')) return t('signup.validate.email.format');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t('signup.validate.email.format');
        return null;
    };

    const validateUserName = (userName: string | null) => {
        if (!userName?.trim()) return t('signup.validate.username.required');
        if (userName.trim().length < 6) return t('signup.validate.username.minLength');
        if (!/^[a-zA-Z0-9_]+$/.test(userName)) return t('signup.validate.username.format');
        return null;
    };

    const validatePassWord = (passWord: string | null) => {
        if (!passWord?.trim()) return t('signup.validate.password.required');
        if (passWord.trim().length < 6) return t('signup.validate.password.minLength');
        if (!/[A-Z]/.test(passWord)) return t('signup.validate.password.uppercase');
        if (!/[a-z]/.test(passWord)) return t('signup.validate.password.lowercase');
        if (!/[0-9]/.test(passWord)) return t('signup.validate.password.number');
        if (!/[@$!%*?&#]/.test(passWord)) return t('signup.validate.password.special');
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
                    label: t('general.error'),
                    message: firstNameError || lastNameError || emailError || '',
                });
                valid = false;
            }
        }

        const userNameError = validateUserName(userName);
        const passWordError = validatePassWord(passWord);

        if (userNameError || passWordError) {
            setErrorLabelMessage({
                label: t('general.error'),
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
        <div className="flex justify-center items-center">
            <h3 className="px-0">{isSignUp ? t('signup.title') : t('login.title')}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 w-full">
                {isSignUp && (
                    <>
                        <InputField
                            type="text"
                            label={t('signup.field.firstName')}
                            value={firstName}
                            onChange={setFirstName}
                            validate={validateFirstName}
                            placeholder={t('signup.validate.firstName.placeholder')}
                            required
                        />

                        <InputField
                            type="text"
                            label={t('signup.field.lastName')}
                            value={lastName}
                            onChange={setLastName}
                            validate={validateLastName}
                            placeholder={t('signup.validate.lastName.placeholder')}
                            required
                        />

                        <InputField
                            type="email"
                            label={t('signup.field.email')}
                            value={email}
                            onChange={setEmail}
                            validate={validateEmail}
                            placeholder={t('signup.validate.email.placeholder')}
                            required
                        />
                    </>
                )}

                <InputField
                    type="text"
                    label={isSignUp ? t('signup.field.username') : t('login.field.username')}
                    value={userName}
                    onChange={setUserName}
                    validate={validateUserName}
                    placeholder={
                        isSignUp
                            ? t('signup.validate.username.placeholder')
                            : t('login.validate.username.placeholder')
                    }
                    required
                />

                <InputField
                    type="password"
                    label={isSignUp ? t('signup.field.password') : t('login.field.password')}
                    value={passWord}
                    onChange={setPassWord}
                    validate={validatePassWord}
                    placeholder={
                        isSignUp
                            ? t('signup.validate.username.placeholder')
                            : t('login.validate.username.placeholder')
                    }
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                    {isSignUp ? t('signup.button') : t('login.button')}
                </button>

                {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
            </form>
        </div>
    );
};

export default UserSignupLoginForm;
