import React from "react";
import SettingsOption from "../reusables/SettingsOption";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={`${styles.settingsWrapper}`}>
      <SettingsOption settingName="deepFocus" settingLabel="Deep Focus Mode" />
      <SettingsOption settingName="runOnStartup" settingLabel="Run On Startup"/>
      <h1 className={`${styles.settingsHeader} pageHeader text-center`}>Settings</h1>

    </div>
  );
};

export default Settings;
