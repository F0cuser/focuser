import React , {useRef} from "react";
import { useDispatch, useSelector } from 'react-redux'


import styles from "./TimerElement.module.css";

import upArrowPath from "../../../public/static/images/up-arrow.svg";
import downArrowPath from "../../../public/static/images/down-arrow.svg";
import { RootState } from "../../utils/store";
import { setTimer } from "../../utils/reducers/timer";

const TimerElement = () => {
  let timer = useSelector((state: RootState) => state.timer.timer);
  const dispatch = useDispatch();
  const intervalRef = useRef(0);


  const onTimerAdjustPress = (digitType: string, timeToAdd: number) => {
    if (intervalRef.current) return; 
    intervalRef.current = window.setInterval(() => {updateTime(digitType, timeToAdd)}, 100)
  }

  const stopTimerAdjust = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = 0
  }



  const updateTime = (digitType: string, timeToAdd: number) => {
    const prevValue = timer[digitType];
    if ((prevValue === 0 && timeToAdd < 0) || (digitType !== 'hours' && prevValue === 59 && timeToAdd > 0)) {
      timer = {...timer, [digitType]: 0}
    }
    else {
      timer = {...timer, [digitType]: timer[digitType] + timeToAdd}
    }
    dispatch(setTimer(timer))
  }


  return (
    <div className={`${styles.timerElementWrapper} d-flex align-items-center mt-5`}>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button className={`${styles.upButton} ${styles.timerAdjust} mb-2`} onMouseUp={stopTimerAdjust} onMouseDown={() => onTimerAdjustPress('hours', 1)}>
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`} id="hoursDigits">{timer.hours.toString().padStart(2, '0')}</h1>
        <button className={`${styles.downButton} ${styles.timerAdjust}`} onMouseUp={stopTimerAdjust} onMouseDown={() => onTimerAdjustPress('hours', -1)}>
          <img className={`${styles.buttonImage}`} src={downArrowPath} alt="down" />
        </button>
      </div>
      <div className={`${styles.separator} pb-3`}>:</div>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button className={`${styles.upButton} ${styles.timerAdjust} mb-2`} onMouseUp={stopTimerAdjust} onMouseDown={() => onTimerAdjustPress('minutes', 1)}>
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`} id="minutesDigits">{timer.minutes.toString().padStart(2, '0')}</h1>
        <button className={`${styles.downButton} ${styles.timerAdjust}`} onMouseUp={stopTimerAdjust} onMouseDown={() => onTimerAdjustPress('minutes', -1)}>
          <img className={`${styles.buttonImage}`} src={downArrowPath} alt="down" />
        </button>
      </div>
      <div className={`${styles.separator} pb-3`}>:</div>
      <div
        className={`d-flex flex-column align-items-center ${styles.segmentWrapper}`}
      >
        <button className={`${styles.upButton} ${styles.timerAdjust} mb-2`} onMouseUp={stopTimerAdjust} onMouseDown={() => onTimerAdjustPress('seconds', 1)}>
          <img className={`${styles.buttonImage}`} src={upArrowPath} alt="up" />
        </button>
        <h1 className={`${styles.digits} mt-2`} id="secondsDigits">{timer.seconds.toString().padStart(2, '0')}</h1>
        <button className={`${styles.downButton} ${styles.timerAdjust}`} onMouseUp={stopTimerAdjust} onMouseDown={() => onTimerAdjustPress('seconds', -1)}>
          <img className={`${styles.buttonImage}`} src={downArrowPath} alt="down" />
        </button>
      </div>
    </div>
  );
};

export default TimerElement;
