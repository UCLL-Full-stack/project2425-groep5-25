import React, { useState } from "react";
import styles from "@styles/InputField.module.css";

type InputFieldProps = {
  label: string;
  value: string | null;
  placeholder?: string;
  onChange: (value: string | null) => void;
  required?: boolean;
  validate?: (value: string | null) => string | null;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
  required,
  validate,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validation = (newValue: string | null) => {
    if (newValue && validate) {
      const validationError = validate(newValue);
      setError(validationError);
    } else {
      setError(null);
    }
  };

  const handleChange = (option: { value: string } | null) => {
    const newValue = option?.value || null;
    onChange(newValue);
    validation(newValue);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <label>{label}</label>
        <div className={styles.innerInputContainer}>
          <input
            type="text"
            value={value || ""}
            required={required}
            placeholder={placeholder}
            onChange={(e) => handleChange({ value: e.target.value })}
            className={`${styles.input} ${error ? styles.error : ""}`}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      </div>
    </>
  );
};

export default InputField;
