import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./HistoryPage.css";
import Button from "../components/Button";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const HistoryPage = () => {
  const questions = [
    "1. 창업동아리에서 비대면 심리상담 앱을 기획하셨는데, 기존 심리상담 서비스와 차별화된 '심리상담 게임'을 도입하게 된 구체적인 계기와 개발 과정에서의 어려움은 무엇이었나요?",
    "2. 다양한 게임 장르를 경험하셨는데, FPS에서 MMORPG로 전환하면서 느낀 게임 디자인의 차이점과 각 장르에서 배운 게임 기획적 요소는 무엇인가요?",
    "3. 군대 생활을 통해 '균형 잡힌 관계 유지'의 중요성을 깨달으셨다고 했는데, 이러한 경험이 게임 기획자로서 유저와의 관계를 설정하는 데 어떤 영향을 미칠 것이라고 생각하시나요?",
  ];
  const answers = [
    "심리상담이라는 주제가 무거운 주제인만큼 사람들이 다가오는 것에 대해 어려워한다는 것을 가까운 심리상담사분에게 들었습니다. 심리상담을 더 쉽고 무겁지않게 느끼지않는 것이 게임이라 생각하여 개발을 계획하였습니다. 개발은 진행하지않고, 대화를 주고받는 게임을 기획만하였습니다.",
    "fps 게임은 pvp기반으로 승리라는 목적으로 디자인되어있었고, mmorpg는 pve를 통한 아이템 획득 및 사냥 목적이였습니다. 각 게임 장르의 목적마다 주는 재미가 달랐고 mmorpg는 사람들에게 스트레스 받는 것이 없어서 부담없이 즐겼습니다. fps 장르에서는 레벨 디자인에 대해, mmorpg에서는 밸런스에 대해 배웠습니다. fps 장르는 정해진 맵에서 진행하는 만큼 그 맵에서 디자인이 정말중요했습니다. mmorpg는 방어력, 골드, hp등 값에 따라 게임의 많은 영향이 간다는 것을 알았습니다.",
    "기획자에게 가장 중요한 것은 소통, 커뮤니케이션이라고 생각합니다. 대화를 통해 내가 만든 기획을 개발자에게 전달하는 것이 중요한만큼, 회사내의 사람들과 좋은 관계를 유지하고 균형 잡힌 관계를 유지하는 것은 게임 기획자로서 도움이 된다고 생각합니다.",
  ];
  const peedback = [
    `긍정적 측면:
  * 심리상담 게임 도입의 기본적인 동기를 명확히 설명함
  * 실제 심리상담사의 의견을 참고했다는 점이 신뢰성을 더함,
  
    개선이 필요한 부분:
  * 게임의 구체적인 기획 내용이나 특징이 부족함
  * "대화를 주고받는 게임"이라는 설명이 너무 피상적임
  * 개발 과정에서의 어려움에 대한 답변이 누락됨
  * 기존 서비스와의 차별점을 더 구체적으로 설명했으면 좋았을 것`,
    `- 긍정적 측면:
  * FPS와 MMORPG의 핵심적인 차이점을 이해하고 있음
  * 각 장르에서 배운 요소들을 구체적으로 언급함

- 개선이 필요한 부분:
  * 게임 디자인적 관점에서의 더 깊이 있는 분석이 필요함
  * 전문적인 게임 기획 용어의 사용이 부족함
  * 예시나 실제 경험한 게임을 구체적으로 언급했으면 더 좋았을 것`,
    `- 긍정적 측면:
  * 커뮤니케이션의 중요성을 잘 인식하고 있음
  * 기획자의 핵심 역량을 이해하고 있음

- 개선이 필요한 부분:
  * 군대에서의 구체적인 경험이나 사례가 없음
  * 유저와의 관계 설정에 대한 답변이 빠져있음
  * 실제 게임 기획 상황에서의 적용 방안이 구체적이지 않음`,
  ];
  const peedbackTotal = `전반적인 제언:
1. 모든 답변에서 구체적인 사례나 경험을 더 포함시킬 필요가 있음
2. 전문성을 보여줄 수 있는 게임 업계 용어나 개념을 더 활용하면 좋을 것
3. 질문의 모든 부분에 대해 빠짐없이 답변할 필요가 있음
4. 자신의 경험과 역량을 더 효과적으로 어필할 수 있는 구체적인 설명이 필요함`;

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
                peedback={peedback[i]}
                isHistory={true}
              />
            ))}
          </div>
          <div style={{ whiteSpace: "pre-line" }}>{peedbackTotal}</div>
          {/* todo 보여주기 변경 */}
          <Button name="PDF로 내보내기" type="button" onClick={exportHandle} />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoryPage;
