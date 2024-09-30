import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./AIPage.css";

const AIPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AI질문</title>
      </Helmet>
      <div>
        <form>
          <label>직종</label>
          <input type="text" />
          <input type="file" />
          <button type="submit">질문 생성</button>
        </form>
      </div>
    </HelmetProvider>
  );
};

export default AIPage;
