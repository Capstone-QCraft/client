import "./Footer.css";
import GitHubIcon from "../icons/GitHubIcon";
import EmailIcon from "../icons/EmailIcon";
const EMAIL = process.env.REACT_APP_EMAIL;

const Footer = () => {
  const setDate = () => {
    const makeYear = 2024;
    const date = new Date();
    const nowYear = date.getFullYear();
    return makeYear === nowYear ? makeYear : `${makeYear}-${nowYear}`;
  };

  return (
    <div className="footer-container">
      <div className="footer-inner">
        <a
          href="https://github.com/Capstone-QCraft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
        <a href={`mailto:${EMAIL}`}>
          <EmailIcon />
        </a>
      </div>
      <hr className="footer-hr" />
      <div className="footer-inner">
        <p className="footer-copyright">
          ⓒ {setDate()}. Qcraft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
