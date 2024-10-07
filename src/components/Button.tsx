import React from "react";
import "./Button.css";

interface ButtonProps {
  name: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, type, onClick }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
