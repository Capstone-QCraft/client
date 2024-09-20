import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
