import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AIPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AI질문</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default AIPage;
