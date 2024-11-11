import React, { useEffect, useRef, useState } from "react";
import mainImg from "../assets/images/ai2.webp";
import Discription from "../components/Discription";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Modal from "../components/Modal";
import InputFile from "../components/InputFile";
import Button from "../components/Button";

import LoadingSpinner from "../components/LoadingSpinner";
import { fileApi } from "../api";

const MainPage = () => {
  const navigate = useNavigate();

  const [y, setY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setY(Math.min(500, window.scrollY));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };
  const handleStart = () => {
    if (isLoggedIn) {
      openModal();
    } else navigate("/login");
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("입사지원서 및 이력서를 업로드 해주세요.");
    } else {
      try {
        setIsLoading(true);
        const res = await fileApi.fileUpload(selectedFile);
        navigate(`/ai/${res.data.fileId}`);
      } catch (error) {
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner message="파일 업로드 중..." />;
  return (
    <HelmetProvider>
      <Helmet>
        <title>Qcraft</title>
      </Helmet>
      <Discription
        h1="면접 준비의 첫걸음 AI와 함께, Qcraft"
        ps={[
          "지원서를 분석하여 AI가 예상 면접 질문을 제공합니다.",
          "AI를 통해 작성하신 답변에 대한 피드백을 받아보세요.",
        ]}
        btn="지금 시작하기"
        onClick={handleStart}
      />

      <img
        src={mainImg}
        alt="메인 이미지"
        width="100%"
        style={{
          transform: `scale(${1 - y / 5000})`,
          borderRadius: `${y / 10}px`,
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      />

      <Discription
        h1="맞춤형 예상 질문 제공"
        ps={[
          "지원서를 분석하여 AI가 당신에게 꼭 맞는 예상 면접 질문을 제공합니다.",
        ]}
      />
      <Discription
        h1="시간 절약"
        ps={[
          "효과적인 준비로 소중한 시간을 절약하고, 면접에 더욱 집중할 수 있습니다.",
        ]}
      />
      <Discription
        h1="자신감 향상"
        ps={["철저한 준비로 면접장에서 자신감 있게 임할 수 있습니다."]}
      />
      <Discription
        h1="전문적인 답변 피드백"
        ps={[
          "작성하신 답변에 대해 AI의 객관적이고 전문적인 피드백을 받아보세요.",
        ]}
      />

      {/* <Discription
        h1="서비스 설명"
        ps={[
          "입사 지원서 업로드 -> AI 면접 예상 질문 생성 -> 답변 제출 -> AI피드백",
        ]}
      /> */}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleCreate}>
          <InputFile onFileSelect={handleFileSelect} />
          <Button name="질문 생성" type="submit" />
        </form>
      </Modal>
    </HelmetProvider>
  );
};

export default MainPage;
