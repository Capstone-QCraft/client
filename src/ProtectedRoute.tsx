import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./store/store";

interface ProtectedRouteProps {
  element: React.ReactElement;
  isLoginPage?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isLoginPage,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("isLoginPage:", isLoginPage);

  if (!isLoggedIn && !isLoginPage) return <Navigate to="/login" />;
  if (isLoggedIn && isLoginPage) return <Navigate to="/" />;
  return element;
};

export default ProtectedRoute;
