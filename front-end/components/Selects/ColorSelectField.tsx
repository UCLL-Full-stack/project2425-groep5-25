import React, { useState } from "react";
import Select from "react-select";
import styles from "@styles/InputField.module.css";
import { Color } from "@types";
import { formatOptionLabel } from "utils/optionFormatters";

type ColorSelectFieldProps = {
  label: string;
  value: Color | null;
  onChange: (value: Color | null) => void;
  required?: boolean;
  placeholder?: string;
  validate?: (value: Color | null) => string | null;
};

const ColorSelectField: React.FC<ColorSelectFieldProps> = ({
  label,
  value,
  onChange,
  required,
  placeholder = "Select color",
  validate,
}) => {
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
            className={`${error ? styles.error : ""}`}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      </div>
    </>
  );
};

export default ColorSelectField;
