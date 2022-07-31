import React from "react";

import styles from "./TimerElement.module.css";

import upArrowPath from "../../../public/static/images/up-arrow.svg";
import downArrowPath from "../../../public/static/images/down-arrow.svg";

const TimerElement = () => {
  return (
    <div className={`${styles.timerElementWrapper} d-flex align-items-center mt-5`}>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button className={`${styles.upButton} ${styles.timerAdjust} mb-2`}>
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`}>00</h1>
        <button className={`${styles.downButton} ${styles.timerAdjust}`}>
          <img className={`${styles.buttonImage}`} src={downArrowPath} alt="down" />
        </button>
      </div>
      <div className={`${styles.separator} pb-3`}>:</div>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button className={`${styles.upButton} ${styles.timerAdjust} mb-2`}>
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`}>00</h1>
        <button className={`${styles.downButton} ${styles.timerAdjust}`}>
          <img className={`${styles.buttonImage}`} src={downArrowPath} alt="down" />
        </button>
      </div>
      <div className={`${styles.separator} pb-3`}>:</div>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button className={`${styles.upButton} ${styles.timerAdjust} mb-2`}>
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`}>00</h1>
        <button className={`${styles.downButton} ${styles.timerAdjust}`}>
          <img className={`${styles.buttonImage}`} src={downArrowPath} alt="down" />
        </button>
      </div>
    </div>
  );
};

export default TimerElement;
