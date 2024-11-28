import "./Icon.css";
const EMAIL = process.env.REACT_APP_EMAIL;

const EmailIcon = () => (
  <svg
    className="icon"
    role="img"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{EMAIL}</title>
    <path d="M16 16.871 1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z" />
  </svg>
);

export default EmailIcon;
