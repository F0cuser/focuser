import React, { useRef } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";

import store from "../utils/store";
import Timer from "./routes/Timer";
import UrlSelect from "./routes/UrlSelect";
import Settings from "./routes/Settings";
import Sidebar from "./base/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";
import BackgroundTimer from "./base/BackgroundTimer";

function App() {
  const toastStyles = {
    success: {
      style: {
        background: "#15591d",
      },
    },
    error: {
      style: {
        background: "#6e1414",
      },
    },
    style: {
      fontFamily: "George Regular",
      color: "#f1f1f1",
    },
  };

  const backgroundTimerRef = useRef() as React.MutableRefObject<{
    updateTime: (...args: any[]) => void;
    resetTime: () => void;
    toggleTimer: () => void;
  }>;

  const callBackgroundTimerFunction = (functionName: string, ...args: (string | number | undefined)[]) => {
    if (backgroundTimerRef?.current) {
      switch (functionName) {
        case ('updateTime'): 
          backgroundTimerRef.current.updateTime(...args);
          break;
        case ('resetTime'):
          backgroundTimerRef.current.resetTime();
          break;
        case ('toggleTimer'):
          backgroundTimerRef.current.toggleTimer();
          break;
      }
    }
  }

  return (
    <Provider store={store}>
      <Toaster toastOptions={toastStyles} />
      <BackgroundTimer ref={backgroundTimerRef} />
      <HashRouter>
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Timer
                    updateTime={(digitType, timeToAdd) => callBackgroundTimerFunction('updateTime', digitType, timeToAdd)}
                    toggleTimer={() => callBackgroundTimerFunction('toggleTimer')}
                    resetTime={() => callBackgroundTimerFunction('resetTime')}
                  />
                }
              />
              <Route path="/urls" element={<UrlSelect />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default hot(App);
