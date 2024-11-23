import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./ProtectedRoute";

function App() {
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
