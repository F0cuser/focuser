import React from "react";

import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={`${styles.settingsWrapper}`}>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="aggressiveModeSwitch"
        />
        <label className="custom-control-label" htmlFor="aggressiveModeSwitch">
          Aggressive Mode - You will not be able to pause the timer until it ends!
        </label>
      </div>
      <h1 className={`${styles.settingsHeader} pageHeader text-center`}>Settings</h1>

    </div>
  );
};

export default Settings;
