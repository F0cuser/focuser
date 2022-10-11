import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import SettingsOption from "../reusables/SettingsOption";
import styles from "./Settings.module.css";

const Settings = () => {
  const isDeepMode = useSelector((state: RootState) => state.settings.settings.deepFocus);
  const timerState = useSelector((state: RootState) => state.timer.isActive);
  return (
    <div className={`${styles.settingsWrapper}`}>
      <SettingsOption settingName="deepFocus" settingLabel="Deep Focus Mode" isDisabled={isDeepMode && timerState} />
      <SettingsOption settingName="runOnStartup" settingLabel="Run On Startup" isDisabled={false} />
      <h1 className={`${styles.settingsHeader} pageHeader text-center`}>Settings</h1>

    </div>
  );
};

export default Settings;
