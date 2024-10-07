import React, { useRef, useState } from "react";
import "./InputFile.css";

interface InputFileProps {
  onFileSelect: (file: File | null) => void;
}

const InputFile: React.FC<InputFileProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name); // 파일 이름 설정
      onFileSelect(file);
    } else {
      setFileName(null);
      onFileSelect(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name); // 드롭된 파일의 이름 설정
      onFileSelect(file);
      if (inputRef.current) {
        inputRef.current.files = event.dataTransfer.files;
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className="custom-file-upload">
      <input
        ref={inputRef}
        type="file"
        id="file-input"
        className="file-input"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-input"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {fileName ? fileName : "파일 가져오기"}
      </label>
    </div>
  );
};

export default InputFile;
