import Discription from "./Discription";
import { useNavigate } from "react-router-dom";
import "./NoList.css";

const NoList = () => {
  const navigate = useNavigate();

  return (
    <div className="no-list-container">
      <Discription
        h1="텅"
        ps={["인터뷰 기록이 존재하지 않습니다.", "AI 인터뷰를 시작해 보세요."]}
        btn="Qcraft 홈"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default NoList;
