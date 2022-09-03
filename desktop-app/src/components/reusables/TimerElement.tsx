import React, { useRef } from "react";
import styles from "./TimerElement.module.css";
import upArrowPath from "../../../public/static/images/up-arrow.svg";
import downArrowPath from "../../../public/static/images/down-arrow.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";


const TimerElement = (props: {
  updateTime: (arg0: string, arg1: number) => void;
}) => {
  const timerState = useSelector((state: RootState) => state.timer.timer);
  const intervalRef = useRef(0);
  const isTimerActive = useSelector((state: RootState) => state.timer.isActive);
  const onTimerAdjustPress = (digitType: string, timeToAdd: number) => {
    props.updateTime(digitType, timeToAdd);
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => {
      props.updateTime(digitType, timeToAdd);
    }, 150);
  };

  const stopTimerAdjust = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };

  return (
    <div
      className={`${styles.timerElementWrapper} d-flex align-items-center mt-5`}
    >
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button
          className={`${styles.upButton} ${styles.timerAdjust} mb-2`}
          onMouseUp={stopTimerAdjust}
          onMouseDown={() => onTimerAdjustPress("hours", 1)}
          disabled={isTimerActive}
        >
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`} id="hoursDigits">
          {timerState.hours.toString().padStart(2, "0")}
        </h1>
        <button
          className={`${styles.downButton} ${styles.timerAdjust}`}
          onMouseUp={stopTimerAdjust}
          onMouseDown={() => onTimerAdjustPress("hours", -1)}
          disabled={isTimerActive}
        >
          <img
            className={`${styles.buttonImage}`}
            src={downArrowPath}
            alt="down"
          />
        </button>
      </div>
      <div className={`${styles.separator} pb-3`}>:</div>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button
          className={`${styles.upButton} ${styles.timerAdjust} mb-2`}
          onMouseUp={stopTimerAdjust}
          onMouseDown={() => onTimerAdjustPress("minutes", 1)}
          disabled={isTimerActive}
        >
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`} id="minutesDigits">
          {timerState.minutes.toString().padStart(2, "0")}
        </h1>
        <button
          className={`${styles.downButton} ${styles.timerAdjust}`}
          onMouseUp={stopTimerAdjust}
          onMouseDown={() => onTimerAdjustPress("minutes", -1)}
          disabled={isTimerActive}
        >
          <img
            className={`${styles.buttonImage}`}
            src={downArrowPath}
            alt="down"
          />
        </button>
      </div>
      <div className={`${styles.separator} pb-3`}>:</div>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button
          className={`${styles.upButton} ${styles.timerAdjust} mb-2`}
          onMouseUp={stopTimerAdjust}
          onMouseDown={() => onTimerAdjustPress("seconds", 1)}
          disabled={isTimerActive}
        >
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`} id="secondsDigits">
          {timerState.seconds.toString().padStart(2, "0")}
        </h1>
        <button
          className={`${styles.downButton} ${styles.timerAdjust}`}
          onMouseUp={stopTimerAdjust}
          onMouseDown={() => onTimerAdjustPress("seconds", -1)}
          disabled={isTimerActive}
        >
          <img
            className={`${styles.buttonImage}`}
            src={downArrowPath}
            alt="down"
          />
        </button>
      </div>
    </div>
  );
};

export default TimerElement;
