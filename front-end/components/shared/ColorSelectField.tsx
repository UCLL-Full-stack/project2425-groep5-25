import { Color } from '@types';
import { formatOptionLabelByValue } from '@utils/colorUtils';
import React, { useState } from 'react';
import Select from 'react-select';

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
    const options = Object.entries(Color).map(([label, hex]) => ({
        value: hex,
        label,
    }));

    const validateValue = (newValue: Color | null) => {
        if (newValue !== null && validate) {
            const validationError = validate(newValue);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    const handleChange = (option: { value: any } | null) => {
        const selectedValue = (option?.value || null) as Color;
        onChange(selectedValue);
        validateValue(selectedValue);
    };

    return (
        <>
            <div className="input-container">
                <label>{label}</label>
                <div className="input-inner-container">
                    <Select
                        options={options}
                        value={options.find((option) => option.value === value) ?? null}
                        onChange={handleChange}
                        formatOptionLabel={formatOptionLabelByValue}
                        isSearchable={false}
                        placeholder={placeholder}
                        required={required}
                        className={`input-h ${error ? 'error' : ''}`}
                    />
                    {error && <span className="input-error-message">{error}</span>}
                </div>
            </div>
        </>
    );
};

export default ColorSelectField;
