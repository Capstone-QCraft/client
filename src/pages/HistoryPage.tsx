import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./HistoryPage.css";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { interviewApi } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [positivePoint, setPositivePoint] = useState([]);
  const [improvement, setImprovement] = useState([]);
  // const [peedbacks, setPeedbacks] = useState([]);
  const [totalPeedback, setTotalPeedback] = useState("");

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
      // const pdfHeight = pdf.internal.pageSize.getHeight();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf"); // PDF 다운로드

      // todo 글자 인식 가능한 pdf 로 저장 가능하면 진행
    }
  };

  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    if (!id) {
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      navigate("/histories");
    } else {
      const res = await interviewApi.history(id);
      setQuestions(res.data.interview.questions);
      setAnswers(res.data.interview.answers);
      setPositivePoint(res.data.interview.positivePoint);
      setImprovement(res.data.interview.improvement);
      setTotalPeedback(res.data.interview.overallSuggestion);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="history-container">
        <div className="history-inner">
          <div ref={exportRef}>
            {questions.map((v, i) => (
              <Chat
                key={i}
                question={v}
                answer={answers[i]}
                positivePoint={positivePoint[i]}
                improvement={improvement[i]}
                isHistory={true}
              />
            ))}
          </div>
          <br />
          <div style={{ whiteSpace: "pre-line" }}>{totalPeedback}</div>
          <Button name="PDF로 내보내기" type="button" onClick={exportHandle} />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoryPage;
