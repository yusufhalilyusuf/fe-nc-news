import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/Usercontext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <UserProvider>

      <App />

  </UserProvider>
  </BrowserRouter>
);
