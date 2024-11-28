import React, { useState } from "react";
import "./InputField.css";

interface InputFieldProps {
  id?: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  inputRef,
}) => {
  const [inputType, setInputType] = useState(type);
  const [focused, setFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={`input-container ${focused || value ? "focused" : ""}`}>
      <div className="input-wrapper">
        <input
          id={id}
          type={inputType}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={onChange}
          className="input-field"
          ref={inputRef}
        />
        {type === "password" && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
          >
            {inputType === "password" ? "보기" : "숨기기"}
          </button>
        )}
      </div>
      <label htmlFor={id} className="floating-label">
        {label}
      </label>
    </div>
  );
};

export default InputField;
