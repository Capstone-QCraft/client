import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const HistoryPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div>HistoryPage</div>
    </HelmetProvider>
  );
};

export default HistoryPage;
