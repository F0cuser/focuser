import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import store from "../utils/store";
import Timer from "./routes/Timer";
import AppSelect from "./routes/AppSelect";
import UrlSelect from "./routes/UrlSelect";
import Settings from "./routes/Settings";
import Sidebar from "./base/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <HashRouter>
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/">
              <Route index element={<Timer />} />
              <Route path="/urls" element={<UrlSelect />} />
              <Route path="/apps" element={<AppSelect />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default hot(App);
