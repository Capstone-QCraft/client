import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { userApi } from "./api";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await userApi.refreshToken();
        await dispatch(login({ accessToken: res.data.body.accessToken }));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isLoginPage ? (
                <ProtectedRoute
                  element={route.element}
                  isLoginPage={route.isLoginPage}
                />
              ) : route.auth ? (
                <ProtectedRoute element={route.element} />
              ) : (
                route.element
              )
            }
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
