import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Timer.module.css";

import TimerElement from "../reusables/TimerElement";
import TimerToggleButton from "../reusables/TimerToggleButton";
import SettingsOption from "../reusables/SettingsOption";
import BaseModal from "../modals/BaseModal";
import { openModal } from "../../utils/reducers/modal";
import { RootState } from "../../utils/store";
import DeepFocusWarningModal from "../modals/DeepFocusWarningModal";

const Timer = (props: {
  updateTime: (arg0: string, arg1: number) => void;
  toggleTimer: () => void;
}) => {
  const settings = useSelector((state: RootState) => state.settings.settings);
  const timerState = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();
  const checkIfDeepMode = () => {
    if (settings.deepFocus && !timerState.isActive) {
      dispatch(openModal("deepFocusWarning"));
    } else props.toggleTimer();
  };
  return (
    <div className={`${styles.timerWrapper} text-center`}>
      <BaseModal modalId="deepFocusWarning">
        <DeepFocusWarningModal toggleTimer={props.toggleTimer} />
      </BaseModal>
      <div className={`${styles.mainContent}`}>
        <div className={`d-flex justify-content-between align-items-center`}>
          <TimerElement updateTime={props.updateTime} />
          <TimerToggleButton
            toggleFunction={checkIfDeepMode}
            disabled={!new Date()}
          />
        </div>
        <div className={`row mt-5 px-3`}>
          <SettingsOption
            settingName="deepFocus"
            settingLabel="Deep Focus Mode"
          />
        </div>
      </div>
      <h1 className={`${styles.timerHeader} pageHeader`}>Timer</h1>
    </div>
  );
};

export default Timer;
