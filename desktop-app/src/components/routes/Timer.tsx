import React from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  return (
    <div className={`${styles.timerWrapper} text-center`}>
      <h1 className={`${styles.timerHeader} pageHeader`}>Timer</h1>
    </div>
  );
};

export default Timer;
