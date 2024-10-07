import { useState, useEffect } from "react";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const useSpeechRecognition = (lang = "ko-KR") => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  let recognition: any;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
  }

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setText(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
  };
};

export default useSpeechRecognition;
