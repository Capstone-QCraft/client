import { useRef } from "react";
import "./Discription.css";
import useIntersectionObsever from "../hooks/useIntersectionObsever";

interface DiscriptionProps {
  h1: string;
  ps: string[];
  btn?: string;
  onClick?: () => void;
}

const Discription: React.FC<DiscriptionProps> = ({ h1, ps, btn, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);

  return (
    <div
      className={`discription-container ${isInViewport ? "show-item" : ""}`}
      ref={ref}
    >
      <div className="discription-inner">
        <h1>{h1}</h1>
        {ps.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {btn && onClick && (
        <div className="discription-button-inner">
          <button className="discription-button" onClick={onClick}>
            {btn}
          </button>
        </div>
      )}
    </div>
  );
};

export default Discription;
