import { HelmetProvider, Helmet } from "react-helmet-async";
import Information from "../components/Information";
import "./UserPage.css";
import useGetInfo from "../hooks/useGetInfo";

const UserPage = () => {
  const { data } = useGetInfo();
  return (
    <HelmetProvider>
      <Helmet>
        <title>내정보</title>
      </Helmet>
      <div className="user-container">
        <Information
          h2="계정 정보"
          contents={[
            ["이름", data?.name],
            ["이메일", data?.email],
          ]}
        ></Information>
        <Information
          h2="계정 관리"
          contents={
            data?.type === "email"
              ? [
                  ["비밀번호", "변경"],
                  ["회원", "탈퇴"],
                ]
              : [["회원", "탈퇴"]]
          }
        ></Information>
      </div>
    </HelmetProvider>
  );
};

export default UserPage;
