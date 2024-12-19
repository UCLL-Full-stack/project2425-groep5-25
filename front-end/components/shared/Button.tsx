import React from 'react';

type Props = {
    onClick: (e: React.FormEvent) => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    label: string;
    isActive?: boolean;
    type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({
    onClick,
    isLoading = false,
    isDisabled = false,
    label,
    isActive = true,
    type = 'button',
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`w-full py-2 px-4 rounded-lg shadow-md text-white transition duration-100 
                ${
                    isLoading || isDisabled
                        ? 'bg-gray-400 opacity-50 cursor-not-allowed'
                        : isActive
                          ? 'bg-blue-500 hover:bg-blue-400'
                          : 'bg-red-500 hover:bg-red-400'
                }`}>
            {label}
        </button>
    );
};

export default Button;
