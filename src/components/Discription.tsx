import "./Discription.css";

interface DiscriptionProps {
  h1: string;
  ps: string[];
  btn?: string;
}

const Discription: React.FC<DiscriptionProps> = ({ h1, ps, btn }) => {
  return (
    <div className="discription-container">
      <div className="discription-inner">
        <h1>{h1}</h1>
        {ps.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {btn && (
        <div className="discription-inner">
          <button className="discription-button">{btn}</button>
        </div>
      )}
    </div>
  );
};

export default Discription;
