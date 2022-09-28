import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useTimer } from "react-timer-hook";
import { useDispatch } from "react-redux";
import { toggleActive, setTimer } from "../../utils/reducers/timer";


const BackgroundTimer = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const timerHook = useTimer({
    autoStart: false,
    expiryTimestamp: new Date(),
    onExpire: () => {
      dispatch(toggleActive({isFinished: true}));
    },
  }) as { [key: string]: any };

  useImperativeHandle(ref, () => ({
    updateTime(digitType: 'hours' | 'minutes' | 'seconds', timeToAdd: number) {
      const timePeriodsInSeconds = {hours: 3600, minutes: 60, seconds: 1}
      timerHook.seconds += timeToAdd * timePeriodsInSeconds[digitType] 
      const newTime = convertSelectionToDateObj({
        hours: timerHook.hours,
        minutes: timerHook.minutes,
        seconds: timerHook.seconds,
      });
      timerHook.restart(newTime, false);
    },

    toggleTimer() {
      dispatch(toggleActive({isFinished: false}));
      if (timerHook.isRunning) timerHook.pause();
      else timerHook.resume();
    },
  }));

  useEffect(() => {
    dispatch(
      setTimer({
        hours: timerHook.hours,
        minutes: timerHook.minutes,
        seconds: timerHook.seconds,
      }),
    );
  }, [dispatch, timerHook.hours, timerHook.minutes, timerHook.seconds]);

  const convertSelectionToDateObj = (timerSelection: {
    [key: string]: number;
  }): Date => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerSelection.seconds);
    time.setMinutes(time.getMinutes() + timerSelection.minutes);
    time.setHours(time.getHours() + timerSelection.hours);
    return time;
  };

  return <></>;
});

export default BackgroundTimer;
