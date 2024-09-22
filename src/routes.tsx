import AIPage from "./pages/AIPage";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";

const routes = [
  { auth: false, path: "/", element: <MainPage /> },
  { auth: false, path: "/ai", element: <AIPage /> },
  { auth: false, path: "/history", element: <HistoryPage /> },
  { auth: false, path: "/user", element: <UserPage /> },
  { auth: false, path: "*", element: <ErrorPage /> },
];

export default routes;

//test
