import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./HistoryPage.css";
import Button from "../components/Button";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const HistoryPage = () => {
  const questions = [
    "질문1 : 질문1의 내용을 길게 써보자, 더 길게 써보도록 하자, 너비의 길이는?",
    "질문2",
    "질문3",
    "질문4",
    "질문5",
  ];
  const answers = [
    "답변1: 답변1의 내용을 길게 써보자, 더 길게 써보도록 하자, 너비의 길이는?",
    "답변2",
    "답변3",
    "답변4",
    "답변5",
  ];

  const exportRef = useRef<HTMLDivElement>(null);
  const exportHandle = async () => {
    if (exportRef.current) {
      // 1. html2canvas로 특정 영역 캡처
      const canvas = await html2canvas(exportRef.current);

      // 2. 캔버스를 이미지로 변환
      const imgData = canvas.toDataURL("image/png");

      // 3. PDF 생성 및 이미지 추가
      const pdf = new jsPDF("portrait", "px", "a4"); // A4 사이즈 PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf"); // PDF 다운로드

      // todo 글자 인식 가능한 pdf 로 저장 가능하면 진행
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="history-container">
        <div className="history-inner">
          <div ref={exportRef}>
            {questions.map((v, i) => (
              <Chat key={i} question={v} answer={answers[i]} isHistory={true} />
            ))}
          </div>
          <Button name="PDF로 내보내기" type="button" onClick={exportHandle} />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoryPage;
