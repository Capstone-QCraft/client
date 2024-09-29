import React from "react";
import "./Information.css";

interface InformationProps {
  h2: string;
  contents: string[][];
}

const Information: React.FC<InformationProps> = ({ h2, contents }) => {
  return (
    <div className="information-container">
      <h2>{h2}</h2>
      {contents.map((content, i) => (
        <>
          <div className="information-inner">
            <p key={content + "0"}>{content[0]}</p>
            <p key={content + "1"}>{content[1]}</p>
          </div>
          {i < contents.length - 1 && <hr className="user-hr"></hr>}
        </>
      ))}
    </div>
  );
};

export default Information;
