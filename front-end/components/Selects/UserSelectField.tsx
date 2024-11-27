import React, { useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { IdName } from "@types";
import styles from "@styles/InputField.module.css";

type UserSelectFieldProps = {
  label: string;
  userIdNames: Array<IdName>;
  value: number[];
  onChange: (value: number[]) => void;
  required?: boolean;
  placeholder?: string;
  validate?: (value: number[]) => string | null;
};

const UserSelectField: React.FC<UserSelectFieldProps> = ({
  label,
  userIdNames,
  value,
  onChange,
  required,
  placeholder = "Select users (optional)",
  validate,
}) => {
  const [error, setError] = useState<string | null>(null);
  const options = userIdNames
    .filter((user) => user.id !== undefined)
    .map((user) => ({
      value: user.id as number,
      label: user.name,
    }));

  const validation = (newValue: number[]) => {
    if (newValue.length > 0 && validate) {
      const validationError = validate(newValue);
      setError(validationError);
    } else {
      setError(null);
    }
  };

  const handleChange = (
    options: MultiValue<{ value: number; label: string }>
  ) => {
    const selectedValues = options.map((option) => option.value);
    onChange(selectedValues);
    validation(selectedValues);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <label>{label}</label>
        <div className={styles.innerInputContainer}>
          <Select
            isMulti
            options={options}
            value={options.filter((option) => value.includes(option.value))}
            required={required}
            placeholder={placeholder}
            onChange={handleChange}
            className={`${error ? styles.error : ""}`}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      </div>
    </>
  );
};

export default UserSelectField;
