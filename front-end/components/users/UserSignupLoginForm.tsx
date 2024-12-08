import InputField from '@components/Selects/InputField';
import { UserInput } from '@types';
import React, { useState } from 'react';

interface LoginSignupProps {
    type: 'login' | 'signup';
    onSubmit: (data: UserInput) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ type, onSubmit }) => {
    const [name, setName] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [firstName, setFirstName] = useState<string | null>('');
    const [lastName, setLastName] = useState<string | null>('');
    const [role, setRole] = useState<string | null>('');

    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

    const clearErrors = () => {
        setErrors({});
    };

    const validate = (): boolean => {
        let valid = true;
        const newErrors: { [key: string]: string | null } = {};

        if (!name?.trim()) {
            newErrors.name = 'Username is required';
            valid = false;
        }
        if (!password?.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        if (type === 'signup') {
            if (!email?.trim()) {
                newErrors.email = 'Email is required';
                valid = false;
            }
            if (!firstName?.trim()) {
                newErrors.firstName = 'First name is required';
                valid = false;
            }
            if (!lastName?.trim()) {
                newErrors.lastName = 'Last name is required';
                valid = false;
            }
            if (!role?.trim()) {
                newErrors.role = 'Role is required';
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const data: UserInput = {
            userName: name,
            passWord: password,
            email,
            firstName,
            lastName,
            role,
        };

        onSubmit(data);
    };

    return (
        <>
            <h3 className="px-0">{type === 'login' ? 'Login' : 'Sign Up'}</h3>

            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    label="Username"
                    value={name}
                    onChange={setName}
                    placeholder="Enter your username"
                    required={true}
                    validate={(value) => (!value ? 'Username is required' : null)}
                />
                {errors.name && <div className="text-red-800">{errors.name}</div>}

                <InputField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    required={true}
                    validate={(value) => (!value ? 'Password is required' : null)}
                />
                {errors.password && <div className="text-red-800">{errors.password}</div>}

                {type === 'signup' && (
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
                        {errors.email && <div className="text-red-800">{errors.email}</div>}

                        <InputField
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            placeholder="Enter your first name"
                            required={true}
                            validate={(value) => (!value ? 'First name is required' : null)}
                        />
                        {errors.firstName && <div className="text-red-800">{errors.firstName}</div>}

                        <InputField
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            placeholder="Enter your last name"
                            required={true}
                            validate={(value) => (!value ? 'Last name is required' : null)}
                        />
                        {errors.lastName && <div className="text-red-800">{errors.lastName}</div>}

                        <InputField
                            type="text"
                            label="Role"
                            value={role}
                            onChange={setRole}
                            placeholder="Enter your role (e.g., Admin, User)"
                            required={true}
                            validate={(value) => (!value ? 'Role is required' : null)}
                        />
                        {errors.role && <div className="text-red-800">{errors.role}</div>}
                    </>
                )}

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
                    {type === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </>
    );
};

export default LoginSignup;
