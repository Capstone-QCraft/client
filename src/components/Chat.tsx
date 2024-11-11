import "./Chat.css";
import mic from "../assets/images/microphone.png";
import stop from "../assets/images/stop.png";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { useRef } from "react";
import useIntersectionObsever from "../hooks/useIntersectionObsever";

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
  const isInViewport = useIntersectionObsever(ref);

  const { text, isListening, startListening, stopListening } =
    useSpeechRecognition();

  return (
    <div
      className={`chat-container ${isInViewport ? "show-item" : ""}`}
      ref={ref}
    >
      <div className="chat-inner chat-q">
        <p className="chat-content">{question}</p>
      </div>
      {isHistory ? (
        <>
          <div className="chat-inner chat-a">
            <p className="chat-content">{answer}</p>
          </div>

          <span>긍정적인 측면</span>
          <div>{positivePoint}</div>
          <br />
          <span>부정적인 측면</span>
          <div>{improvement}</div>
          {/* <div style={{ whiteSpace: "pre-line" }} className="chat-comment">
            {peedback}
          </div> */}
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
