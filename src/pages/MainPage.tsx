import React, { useEffect, useState } from "react";
import mainImg from "../assets/images/ai2.webp";
import Discription from "../components/Discription";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Modal from "../components/Modal";
import InputFile from "../components/InputFile";
import Button from "../components/Button";

import useFileUpload from "../hooks/useFileUpload";

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

  const { refetch } = useFileUpload(selectedFile as File);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("입사지원서 및 이력서를 업로드 해주세요.");
    } else {
      // ai 페이지로 가는 로직
      refetch();
      navigate("/ai");
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Qcraft</title>
      </Helmet>
      <Discription
        h1="면접 준비의 첫걸음 AI와 함께, Qcraft"
        ps={[
          "입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.",
          "제출한 답변을 AI를 통해 피드백을 받아보세요",
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
        h1="면접 준비 막막하셨나요?"
        ps={[
          "입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.",
          "제출한 답변을 AI를 통해 피드백을 받아보세요",
        ]}
      />

      <Discription
        h1="서비스 이용 방법 이미지"
        ps={[
          "입사 지원서 업로드 -> AI 면접 예상 질문 생성 -> 답변 제출 -> AI피드백",
        ]}
      />

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
