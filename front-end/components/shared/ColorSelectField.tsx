import styles from '@styles/InputField.module.css';
import { Color } from '@types';
import React, { useState } from 'react';
import Select from 'react-select';
import { formatOptionLabel } from 'utils/colorUtils';

type Props = {
    label: string;
    value: Color | null;
    onChange: (value: Color | null) => void;
    validate?: (value: Color | null) => string | null;
    placeholder: string;
    required: boolean;
};

const ColorSelectField: React.FC<Props> = ({
    label,
    value,
    onChange,
    validate,
    placeholder,
    required,
}: Props) => {
    const [error, setError] = useState<string | null>(null);
    const options = Object.entries(Color)
        .filter(([label, hex]) => hex !== Color.Gray)
        .map(([label, hex]) => ({
            value: hex,
            label,
        }));

    const validation = (newValue: Color | null) => {
        if (newValue !== null && validate) {
            const validationError = validate(newValue);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    const handleChange = (option: { value: string } | null) => {
        const selectedValue = (option?.value || null) as Color;
        onChange(selectedValue);
        validation(selectedValue);
    };

    return (
        <>
            <div className={styles.inputContainer}>
                <label>{label}</label>
                <div className={styles.innerInputContainer}>
                    <Select
                        options={options}
                        value={options.find((option) => option.value === value) ?? null}
                        required={required}
                        placeholder={placeholder}
                        onChange={handleChange}
                        formatOptionLabel={formatOptionLabel}
                        className={`${error ? styles.error : ''}`}
                    />
                    {error && <span className={styles.errorMessage}>{error}</span>}
                </div>
            </div>
        </>
    );
};

export default ColorSelectField;
