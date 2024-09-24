import AIPage from "./pages/AIPage";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";

const routes = [
  { auth: false, path: "/", element: <MainPage /> },
  { auth: true, path: "/ai", element: <AIPage /> },
  { auth: true, path: "/history", element: <HistoryPage /> },
  { auth: true, path: "/user", element: <UserPage /> },
  { auth: false, isLoginPage: true, path: "/login", element: <LoginPage /> },
  { auth: false, path: "*", element: <ErrorPage /> },
];

export default routes;
