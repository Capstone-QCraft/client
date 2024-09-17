import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

const routes = [
  { auth: false, path: "/", element: <MainPage /> },
  { auth: false, path: "*", element: <ErrorPage /> },
];

export default routes;

//test
