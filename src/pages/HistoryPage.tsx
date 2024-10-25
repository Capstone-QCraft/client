import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./HistoryPage.css";
import Button from "../components/Button";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const HistoryPage = () => {
  const questions = [
    "React에서 상태 관리 도구로 Redux를 사용하는 이유는 무엇인가요?",
    "CSR과 SSR의 차이점은 무엇인가요?",
    "React에서 Virtual DOM이란 무엇인가요? 그리고 왜 사용하는지 설명해 주세요.",
    "웹 성능 최적화를 위해 어떤 방법을 사용하나요?",
    "CORS 문제를 해결하는 방법은 무엇인가요?",
  ];
  const answers = [
    "Redux는 상태를 일관되게 관리하고 여러 컴포넌트 간의 상태 공유를 쉽게 합니다. Prop Drilling을 피할 수 있고 비동기 작업도 처리할 수 있습니다. Redux DevTools로 상태 변화를 추적하기도 편리합니다.",
    "CSR은 클라이언트에서 렌더링하며 페이지 전환이 빠릅니다. SSR은 서버에서 렌더링해 초기 로딩이 빠르고 SEO에 유리합니다.",
    "Virtual DOM은 실제 DOM의 가벼운 복사본으로, JavaScript 객체 형태로 메모리에 유지됩니다. 상태나 props의 변화가 생기면 Virtual DOM이 업데이트되고, 변경된 부분만 실제 DOM에 반영합니다. 이를 통해 전체 DOM을 다시 렌더링하지 않아도 되어 성능이 향상됩니다. React는 이 방식을 사용해 빠른 UI 업데이트와 효율적인 렌더링을 제공합니다.",
    "코드 스플리팅, 이미지 최적화, 브라우저 캐싱, 불필요한 리렌더링 방지, CSS와 JS 압축 및 번들링을 사용합니다.",
    "서버에서 CORS 설정, 프록시 서버 사용, 개발 시 브라우저의 CORS 모드 비활성화를 통해 해결할 수 있습니다.",
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
