import React from "react";
import "./Chat.css";
import mic from "../assets/images/microphone.png";

interface ChatProps {
  question: string;
  answer: string;
}

const Chat: React.FC<ChatProps> = ({ question, answer }) => {
  return (
    <div className="chat-container">
      <div className="chat-inner chat-q">
        <p className="chat-content">{question}</p>
      </div>
      <div className="chat-inner chat-a">
        <p className="chat-content">{answer}</p>
      </div>
      <div className="chat-inner chat-a">
        <textarea
          className="chat-textarea"
          placeholder="이곳에 채팅 또는 음성으로 답변 입력"
        />
        <button className="chat-mic-button">
          <img src={mic} alt="microphone" className="chat-mic-img" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
