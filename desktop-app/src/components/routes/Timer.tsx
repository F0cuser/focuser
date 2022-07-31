import React from "react";
import styles from "./Timer.module.css";

import TimerElement from "../reusables/TimerElement";
import TimerToggleButton from "../reusables/TimerToggleButton";

const Timer = () => {
  return (
    <div className={`${styles.timerWrapper} text-center`}>
      <div
        className={`${styles.mainContent} d-flex justify-content-between align-items-center`}
      >
        <TimerElement />
        <TimerToggleButton />
      </div>
      <h1 className={`${styles.timerHeader} pageHeader`}>Timer</h1>
    </div>
  );
};

export default Timer;
