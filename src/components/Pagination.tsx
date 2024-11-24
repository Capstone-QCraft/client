import { useNavigate, useParams } from "react-router-dom";
import "./Pagination.css";
import test from "./test.png";

interface PaginationProps {
  pageCnt: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCnt }) => {
  const navigate = useNavigate();
  const { id = 1 } = useParams();

  const btn = (num: number) => {
    return (
      <button
        key={num}
        className={`pagination-button ${
          num === Number(id) ? "pagination-active" : null
        }`}
        onClick={() => navigate(`/histories/${num}`)}
      >
        {num}
      </button>
    );
  };

  const sp = (num: number) => {
    return (
      <span key={`pagination-span-${num}`} className="pagination-span">
        ...
      </span>
    );
  };

  const setButtons = (page: number) => {
    const buttons = [];
    if (pageCnt <= 5) {
      for (let i = 1; i <= pageCnt; i++) buttons.push(btn(i));
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) buttons.push(btn(i));
        buttons.push(sp(2));
        buttons.push(btn(pageCnt));
      } else if (pageCnt <= page + 2) {
        buttons.push(btn(1));
        buttons.push(sp(1));
        for (let i = pageCnt - 3; i <= pageCnt; i++) {
          buttons.push(btn(i));
        }
      } else {
        buttons.push(btn(1));
        buttons.push(sp(1));
        for (let i = page - 1; i <= page + 1; i++) {
          buttons.push(btn(i));
        }
        buttons.push(sp(2));
        buttons.push(btn(pageCnt));
      }
    }

    return buttons;
  };

  if (pageCnt === 1) return null;
  return (
    <div className="pagination-container">
      <div className="pagination-inner">
        {Number(id) !== 1 && (
          <button
            className="pagination-button-pn"
            onClick={() => {
              navigate(`/histories/${Number(id) - 1}`);
            }}
          >
            Prev
          </button>
        )}
        {setButtons(Number(id))}
        {Number(id) !== pageCnt && (
          <button
            className="pagination-button-pn"
            onClick={() => {
              navigate(`/histories/${Number(id) + 1}`);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
