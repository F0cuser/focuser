import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useTimer } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";
import { toggleActive, setTimer } from "../../utils/reducers/timer";
import { RootState } from "../../utils/store";

const BackgroundTimer = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const timerHook = useTimer({
    autoStart: false,
    expiryTimestamp: new Date(),
    onExpire: () => {
      dispatch(toggleActive());
    },
  }) as { [key: string]: any };

  useImperativeHandle(ref, () => ({
    updateTime(digitType: string, timeToAdd: number) {
      const prevValue = timerHook[digitType];
      if (
        (prevValue === 0 && timeToAdd < 0) ||
        (digitType !== "hours" && prevValue === 59 && timeToAdd > 0)
      ) {
        timerHook[digitType] = 0;
      } else {
        timerHook[digitType] += timeToAdd;
      }
      const newTime = convertSelectionToDateObj({
        hours: timerHook.hours,
        minutes: timerHook.minutes,
        seconds: timerHook.seconds,
      });
      timerHook.restart(newTime, false);
    },

    toggleTimer() {
      dispatch(toggleActive());
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
