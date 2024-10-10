import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const HistoriesPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="">HistoriesPage</div>
    </HelmetProvider>
  );
};

export default HistoriesPage;
