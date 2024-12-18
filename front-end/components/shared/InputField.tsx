import styles from '@styles/InputField.module.css';
import React, { useState } from 'react';

type Props = {
    type: React.HTMLInputTypeAttribute;
    label: string;
    value: string | null;
    onChange: (value: string | null) => void;
    validate?: (value: string | null) => string | null;
    placeholder: string;
    required: boolean;
};

const InputField: React.FC<Props> = ({
    type,
    label,
    value,
    onChange,
    validate,
    placeholder,
    required,
}: Props) => {
    const [error, setError] = useState<string | null>(null);

    const validateValue = (newValue: any | null) => {
        if (newValue && validate) {
            const validationError = validate(newValue);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    const handleChange = (option: { value: any } | null) => {
        const newValue = option?.value || null;
        onChange(newValue);
        validateValue(newValue);
    };

    return (
        <>
            <div className={styles.inputContainer}>
                <label>{label}</label>
                <div className={styles.innerInputContainer}>
                    <input
                        type={type}
                        value={value || ''}
                        onChange={(e) => handleChange({ value: e.target.value })}
                        placeholder={placeholder}
                        required={required}
                        className={`${styles.input} ${error ? styles.error : ''}`}
                    />
                    {error && <span className={styles.errorMessage}>{error}</span>}
                </div>
            </div>
        </>
    );
};

export default InputField;
