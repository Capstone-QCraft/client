import "./Discription.css";

interface DiscriptionProps {
  h1: string;
  ps: string[];
  btn?: string;
  onClick?: () => void;
}

const Discription: React.FC<DiscriptionProps> = ({ h1, ps, btn, onClick }) => {
  return (
    <div className="discription-container">
      <div className="discription-inner">
        <h1>{h1}</h1>
        {ps.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {btn && onClick && (
        <div className="discription-inner">
          <button className="discription-button" onClick={onClick}>
            {btn}
          </button>
        </div>
      )}
    </div>
  );
};

export default Discription;
