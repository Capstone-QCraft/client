import React from "react";
import "./InputFile.css";

const InputFIle = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //   setSelectedFile(e.target.files[0]);
    }
  };
  return <input type="file" onChange={handleFileChange} />;
};

export default InputFIle;
