import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AIPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AI질문</title>
      </Helmet>
      <div>AIPage</div>
    </HelmetProvider>
  );
};

export default AIPage;
