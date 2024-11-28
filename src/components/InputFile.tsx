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
      const validExtensions = ["pdf", "docx", "doc", "hwp"]; // 허용된 확장자 목록
      const fileExtension = file.name.split(".").pop()?.toLowerCase(); // 확장자 추출

      if (fileExtension && validExtensions.includes(fileExtension)) {
        setFileName(file.name); // 드롭된 파일의 이름 설정
        onFileSelect(file);
        if (inputRef.current) {
          inputRef.current.files = event.dataTransfer.files;
        }
      } else {
        alert(
          "허용되지 않은 파일 형식입니다. .pdf, .docx, .doc, .hwp만 업로드할 수 있습니다."
        );
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
        accept=".pdf,.docx,.hwp,.doc"
      />
      <label
        htmlFor="file-input"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {fileName ? fileName : "입사지원서 및 이력서 (pdf, docx, .doc, hwp)"}
      </label>
    </div>
  );
};

export default InputFile;
