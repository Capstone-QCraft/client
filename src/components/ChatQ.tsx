import React from "react";
import "./Chat.css";

interface ChatQProps {
  question: string;
}

const ChatQ: React.FC<ChatQProps> = ({ question }) => {
  return (
    <div className="chat-wrapper">
      <img
        src="https://via.placeholder.com/40" // 여기에 프로필 이미지 URL을 입력
        alt="Profile"
        className="chat-profile"
      />
      <div className="chat-container">
        <div className="chat-bubble">
          <p className="chat-content">{question}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatQ;
