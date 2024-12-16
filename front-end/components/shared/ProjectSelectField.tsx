import styles from '@styles/InputField.module.css';
import { ProjectOutput } from '@types';
import React, { useState } from 'react';
import Select from 'react-select';
import { formatOptionLabel } from 'utils/colorUtils';

type Props = {
    label: string;
    value: ProjectOutput | null;
    onChange: (value: ProjectOutput | null) => void;
    validate?: (value: ProjectOutput | null) => string | null;
    placeholder: string;
    required: boolean;
    projects: Array<ProjectOutput>;
};

const ProjectSelectField: React.FC<Props> = ({
    label,
    value,
    onChange,
    validate,
    placeholder,
    required,
    projects,
}: Props) => {
    const [error, setError] = useState<string | null>(null);

    const formattedOptions = projects.map((project) => ({
        value: project.id,
        label: project.name,
        color: project.color,
    }));

    const validateValue = (newValue: ProjectOutput | null) => {
        if (newValue !== null && validate) {
            const validationError = validate(newValue);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    const handleChange = (option: { value: number; label: string } | null) => {
        const selectedValue = option
            ? projects.find((opt) => opt.id === option.value) || null
            : null;
        onChange(selectedValue);
        validateValue(selectedValue);
    };

    return (
        <>
            <div className={styles.inputContainer}>
                <label>{label}</label>
                <div className={styles.innerInputContainer}>
                    <Select
                        options={formattedOptions}
                        value={
                            formattedOptions.find(
                                (option) => option.value === (value?.id || null),
                            ) ?? null
                        }
                        onChange={handleChange}
                        formatOptionLabel={formatOptionLabel}
                        isSearchable={false}
                        placeholder={placeholder}
                        required={required}
                        className={`${error ? styles.error : ''}`}
                    />
                    {error && <span className={styles.errorMessage}>{error}</span>}
                </div>
            </div>
        </>
    );
};

export default ProjectSelectField;
