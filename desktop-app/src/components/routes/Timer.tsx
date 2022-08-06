import React from "react";
import styles from "./Timer.module.css";

import TimerElement from "../reusables/TimerElement";
import TimerToggleButton from "../reusables/TimerToggleButton";
import { useTimer } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { toggleActive } from "../../utils/reducers/timer";

const Timer = () => {

  const dispatch = useDispatch();

  const timerHook = useTimer({
    autoStart: false,
    expiryTimestamp: new Date(),
    onExpire: () => {dispatch(toggleActive())}
  }) as { [key: string]: any };

  const convertSelectionToDateObj = (timerSelection: {
    [key: string]: number;
  }): Date => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerSelection.seconds);
    time.setMinutes(time.getMinutes() + timerSelection.minutes);
    time.setHours(time.getHours() + timerSelection.hours);
    return time;
  };

  const updateTime = (digitType: string, timeToAdd: number) => {
    const prevValue = timerHook[digitType];
    if (
      (prevValue === 0 && timeToAdd < 0) ||
      (digitType !== "hours" && prevValue === 59 && timeToAdd > 0)
    ) {
      timerHook[digitType] = 0;
    } else {
      timerHook[digitType] += 1;
    }
    const newTime = convertSelectionToDateObj({
      hours: timerHook.hours,
      minutes: timerHook.minutes,
      seconds: timerHook.seconds,
    });
    timerHook.restart(newTime, false);
  };


  const toggleTimer = () => {
    dispatch(toggleActive());
    if (timerHook.isRunning)
      timerHook.pause();
    else
      timerHook.resume();
  }

  return (
    <div className={`${styles.timerWrapper} text-center`}>
      <div
        className={`${styles.mainContent} d-flex justify-content-between align-items-center`}
      >
        <TimerElement timer={timerHook} updateTime={updateTime}/>
        <TimerToggleButton toggleFunction={toggleTimer} disabled={!(new Date() )} />
      </div>
      <h1 className={`${styles.timerHeader} pageHeader`}>Timer</h1>
    </div>
  );
};

export default Timer;
