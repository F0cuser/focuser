import React from "react";
import styles from "./Timer.module.css";

import TimerElement from "../reusables/TimerElement";
import TimerToggleButton from "../reusables/TimerToggleButton";


const Timer = (props: {
  updateTime: (arg0: string, arg1: number) => void;
  toggleTimer: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className={`${styles.timerWrapper} text-center`}>
      <div
        className={`${styles.mainContent} d-flex justify-content-between align-items-center`}
      >
        <TimerElement updateTime={props.updateTime} />
        <TimerToggleButton
          toggleFunction={props.toggleTimer}
          disabled={!new Date()}
        />
      </div>
      <h1 className={`${styles.timerHeader} pageHeader`}>Timer</h1>
    </div>
  );
};

export default Timer;
