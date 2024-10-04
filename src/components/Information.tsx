import React from "react";
import "./Information.css";

interface InformationProps {
  h2: string;
  contents: string[][];
}

const Information: React.FC<InformationProps> = ({ h2, contents }) => {
  return (
    <div className="information-container">
      <h2 className="info-h2">{h2}</h2>
      {contents.map((content, i) => (
        <React.Fragment key={i}>
          <div className="information-inner">
            <p className="info-title">{content[0]}</p>
            <p className="info-content">{content[1]}</p>
          </div>
          {i < contents.length - 1 && <hr className="user-hr"></hr>}
        </React.Fragment>
      ))}
    </div>
  );
};

// todo 비밀번호 변경 누르면 아래에 변경 펼쳐지게
// todo 탈퇴 누르면 아래에 정말 탈퇴하시겠습니까 버튼 슈루룩

export default Information;
