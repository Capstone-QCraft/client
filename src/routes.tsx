import OauthResponse from "./components/OauthResponse";
import AIPage from "./pages/AIPage";
import ErrorPage from "./pages/ErrorPage";
import HistoriesPage from "./pages/HistoriesPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";

const routes = [
  { auth: false, path: "/", element: <MainPage /> },
  { auth: true, path: "/ai/:id", element: <AIPage /> },
  { auth: true, path: "/histories", element: <HistoriesPage /> },
  { auth: true, path: "/histories/history/:id", element: <HistoryPage /> },
  { auth: true, path: "/user", element: <UserPage /> },
  {
    auth: false,
    path: "/member/oauth-response/:token",
    element: <OauthResponse />,
  },
  { auth: false, isLoginPage: true, path: "/login", element: <LoginPage /> },
  { auth: false, path: "*", element: <ErrorPage /> },
];

export default routes;
