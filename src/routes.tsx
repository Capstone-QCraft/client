import ErrorPage from "./Pages/ErrorPage";
import MainPage from "./Pages/MainPage";

const routes = [
  { auth: false, path: "/", element: <MainPage /> },
  { auth: false, path: "*", element: <ErrorPage /> },
];

export default routes;

//test
