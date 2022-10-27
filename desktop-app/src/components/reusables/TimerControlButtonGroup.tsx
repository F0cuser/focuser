import React from "react";

import styles from "./TimerControlButtonGroup.module.css";
import playPath from "../../../public/static/images/play.svg";
import pausePath from "../../../public/static/images/pause.svg";
import undoPath from "../../../public/static/images/undo.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

const TimerToggleButton = (props: {
  disabled: boolean;
  toggleFunction: React.MouseEventHandler<HTMLButtonElement>;
  resetFunction: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const isTimerActive = useSelector((state: RootState) => state.timer.isActive);
  return (
    <div class={`${styles.timerControlButtonsWrapper} d-flex align-items-end`}>
      <button onClick={props.resetFunction} disabled={props.disabled} className={`${styles.timerControlButton} ${styles.timerResetButton}  mt-5 ms-5`}>
        <img
          src={undoPath}
          className={`${styles.timerControlButtonImage} ${styles.timerResetButtonImage} `}
          alt="reset-timer"
        />
      </button>
      <button
        className={` ${styles.timerControlButton} ${styles.timerToggleButton} mt-5 ms-4`}
        onClick={props.toggleFunction}
        disabled={props.disabled}
      >
        <img
          src={isTimerActive ? pausePath : playPath}
          alt="start timer"
          className={`${styles.timerControlButtonImage} ${styles.timerToggleButtonImage} `}
        />
      </button>
    </div>
  );
};

export default TimerToggleButton;
