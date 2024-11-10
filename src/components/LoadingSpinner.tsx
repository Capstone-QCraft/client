import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: number; // 스피너 크기 설정
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = 40,
}) => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner" style={{ width: size, height: size }} />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
