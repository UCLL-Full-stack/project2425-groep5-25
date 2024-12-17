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
        if (!firstName?.trim())
            return t('components.userSignUpLoginForm.validate.firstName.required');
        if (firstName.trim().length < 2)
            return t('components.userSignUpLoginForm.validate.firstName.minLength');
        if (firstName.trim().length > 20)
            return t('components.userSignUpLoginForm.validate.firstName.maxLength');
        if (firstName[0] !== firstName[0].toUpperCase())
            return t('components.userSignUpLoginForm.validate.firstName.capitalLetter');
        if (!/^[\p{L}]+$/u.test(firstName))
            return t('components.userSignUpLoginForm.validate.firstName.lettersOnly');
        return null;
    };

    const validateLastName = (lastName: string | null) => {
        if (!lastName?.trim())
            return t('components.userSignUpLoginForm.validate.lastName.required');
        if (lastName.trim().length < 2)
            return t('components.userSignUpLoginForm.validate.lastName.minLength');
        if (lastName.trim().length > 20)
            return t('components.userSignUpLoginForm.validate.lastName.maxLength');
        if (lastName[0] !== lastName[0].toUpperCase())
            return t('components.userSignUpLoginForm.validate.lastName.capitalLetter');
        if (!/^[\p{L}]+$/u.test(lastName))
            return t('components.userSignUpLoginForm.validate.lastName.lettersOnly');
        return null;
    };

    const validateEmail = (email: string | null) => {
        if (!email?.trim()) return t('components.userSignUpLoginForm.validate.email.required');
        if (!email.includes('@')) return t('components.userSignUpLoginForm.validate.email.format');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return t('components.userSignUpLoginForm.validate.email.format');
        return null;
    };

    const validateUserName = (userName: string | null) => {
        if (!userName?.trim())
            return t('components.userSignUpLoginForm.validate.userName.required');
        if (userName.trim().length < 6)
            return t('components.userSignUpLoginForm.validate.userName.minLength');
        if (userName.trim().length > 15)
            return t('components.userSignUpLoginForm.validate.userName.maxlength');
        if (!/^[a-zA-Z0-9_]+$/.test(userName))
            return t('components.userSignUpLoginForm.validate.userName.format');
        return null;
    };

    const validatePassWord = (passWord: string | null) => {
        if (!passWord?.trim())
            return t('components.userSignUpLoginForm.validate.passWord.required');
        if (passWord.trim().length < 6)
            return t('components.userSignUpLoginForm.validate.passWord.minLength');
        if (passWord.trim().length > 30)
            return t('components.userSignUpLoginForm.validate.passWord.maxLength');
        if (!/[A-Z]/.test(passWord))
            return t('components.userSignUpLoginForm.validate.passWord.uppercase');
        if (!/[0-9]/.test(passWord))
            return t('components.userSignUpLoginForm.validate.passWord.number');
        if (!/[@$!%*?&#]/.test(passWord))
            return t('components.userSignUpLoginForm.validate.passWord.special');
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
                    label: t('error.unexpectedErrorLabel'),
                    message:
                        firstNameError ||
                        lastNameError ||
                        emailError ||
                        t('error.unexpectedErrorMessage'),
                });
                valid = false;
            }
        }

        const userNameError = validateUserName(userName);
        const passWordError = validatePassWord(passWord);

        if (userNameError || passWordError) {
            setErrorLabelMessage({
                label: t('error.unexpectedErrorLabel'),
                message: userNameError || passWordError || t('error.unexpectedErrorMessage'),
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 w-full">
                {isSignUp && (
                    <>
                        <InputField
                            type="text"
                            label={t('components.userSignUpLoginForm.labels.firstName')}
                            value={firstName}
                            onChange={setFirstName}
                            validate={validateFirstName}
                            placeholder={t(
                                'components.userSignUpLoginForm.placeholders.signUp.firstName',
                            )}
                            required
                        />

                        <InputField
                            type="text"
                            label={t('components.userSignUpLoginForm.labels.lastName')}
                            value={lastName}
                            onChange={setLastName}
                            validate={validateLastName}
                            placeholder={t(
                                'components.userSignUpLoginForm.placeholders.signUp.lastName',
                            )}
                            required
                        />

                        <InputField
                            type="email"
                            label={t('components.userSignUpLoginForm.labels.email')}
                            value={email}
                            onChange={setEmail}
                            validate={validateEmail}
                            placeholder={t(
                                'components.userSignUpLoginForm.placeholders.signUp.email',
                            )}
                            required
                        />
                    </>
                )}

                <InputField
                    type="text"
                    label={t('components.userSignUpLoginForm.labels.userName')}
                    value={userName}
                    onChange={setUserName}
                    validate={validateUserName}
                    placeholder={
                        isSignUp
                            ? t('components.userSignUpLoginForm.placeholders.signUp.userName')
                            : t('components.userSignUpLoginForm.placeholders.login.userName')
                    }
                    required
                />

                <InputField
                    type="password"
                    label={t('components.userSignUpLoginForm.labels.passWord')}
                    value={passWord}
                    onChange={setPassWord}
                    validate={validatePassWord}
                    placeholder={
                        isSignUp
                            ? t('components.userSignUpLoginForm.placeholders.signUp.passWord')
                            : t('components.userSignUpLoginForm.placeholders.login.passWord')
                    }
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                    {isSignUp
                        ? t('components.userSignUpLoginForm.buttons.signUp')
                        : t('components.userSignUpLoginForm.buttons.login')}
                </button>

                {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
            </form>
        </div>
    );
};

export default UserSignupLoginForm;
