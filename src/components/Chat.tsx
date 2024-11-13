import "./Chat.css";
import mic from "../assets/images/microphone.png";
import stop from "../assets/images/stop.png";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

interface ChatProps {
  question: string;
  answer: string;
  positivePoint?: string;
  improvement?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isHistory?: boolean;

  handleVoice?: (value: string) => void;
}

const Chat: React.FC<ChatProps> = ({
  question,
  answer,
  onChange,
  positivePoint,
  improvement,
  isHistory,

  handleVoice,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObserver(ref);

  const { text, isListening, startListening, stopListening } =
    useSpeechRecognition();

  return (
    <div
      className={`chat-container ${isInViewport ? "show-item" : ""}`}
      ref={ref}
    >
      <div style={{ height: "100px" }}></div>
      <div className="chat-inner chat-q">
        <p className="chat-content">{question}</p>
      </div>
      {isHistory ? (
        <>
          <div className="chat-inner chat-a">
            <p className="chat-content">{answer}</p>
          </div>
          <div className="chat-inner chat-p">👍🏻 {positivePoint}</div>
          <div className="chat-inner chat-p">👎🏻 {improvement}</div>
        </>
      ) : (
        <div className="chat-inner chat-a">
          <textarea
            name="answer"
            className="chat-textarea"
            placeholder="이곳에 채팅 또는 음성으로 답변 입력"
            value={isListening ? answer + text : answer}
            onChange={isListening ? undefined : onChange}
          />
          <button
            className="chat-mic-button"
            onClick={
              isListening
                ? () => {
                    if (stopListening) stopListening();
                    if (handleVoice) handleVoice(text);
                  }
                : startListening
            }
          >
            <img
              src={isListening ? stop : mic}
              alt="microphone"
              className="chat-mic-img"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
