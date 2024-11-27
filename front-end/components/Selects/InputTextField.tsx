import React, { useState } from "react";
import styles from "@styles/InputField.module.css";

type Props = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  validate?: (value: string | null) => string | null;
  placeholder: string;
  required: boolean;
};

const InputField: React.FC<Props> = ({
  label,
  value,
  onChange,
  validate,
  placeholder,
  required,
}: Props) => {
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
