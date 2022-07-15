import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import Timer from './routes/timer';
import Sidebar from "./base/sidebar";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Timer /> } />
      </Routes>
      <Sidebar />
    </HashRouter>
  );
}

export default hot(App);
