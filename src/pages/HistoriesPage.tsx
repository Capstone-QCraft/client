import React, { useEffect, useRef, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./HistoriesPage.css";
import { useNavigate } from "react-router-dom";
import { interviewApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import NoList from "../components/NoList";

export interface Interview {
  interviewId: string;
  fileName: string;
  createdAt: string;
}

const HistoriesPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const [pageCnt, setPageCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [getListNum, setGetListNum] = useState(10);
  const [direction, setDirecttion] = useState("DESC");

  const fetchData = async () => {
    setIsLoading(true);
    const res = await interviewApi.list(currentPage - 1, getListNum);
    if (res.data.code === "INF") {
      setNoData(true);
    } else {
      setPageCnt(Math.ceil(res.data.totalInterviews / getListNum));
      setList(res.data.data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const paginationButtons = () => {
    const divNumbers = Array.from({ length: pageCnt }, (_, index) => index + 1);
    return (
      <div className="pagination-container">
        {divNumbers.map((number) => (
          <div
            key={number}
            className="pagination-button"
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </div>
        ))}
      </div>
    );
  };

  const getNum = (i: number) => {
    return (currentPage - 1) * getListNum + i + 1;
  };

  const getFileName = (str: string) => {
    const res = str.split("_");
    return res[1];
  };

  const getDate = (str: string) => {
    const res = str.split("T");
    return res[0];
  };

  if (isLoading) return <LoadingSpinner />;
  if (noData) return <NoList />;
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="histories-container">
        <div className="histories-inner">
          <div className="list-header">
            <div className="t1">번호</div>
            <div className="t2">파일</div>
            <div className="t3">날짜</div>
          </div>
          {list.map((v, i) => (
            <div
              key={v.interviewId}
              className="list-body"
              onClick={() => {
                navigate(`/histories/history/${v.interviewId}`);
              }}
            >
              <div className="t1">{getNum(i)}</div>
              <div className="t2">{getFileName(v.fileName)}</div>
              <div className="t3">{getDate(v.createdAt)}</div>
            </div>
          ))}
          {paginationButtons()}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoriesPage;
