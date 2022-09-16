import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { updateSettings } from "../../utils/reducers/settings";
import { RootState } from "../../utils/store";


import styles from "./Settings.module.css";

const Settings = () => {
  const settings = useSelector((state: RootState) => state.settings.settings);
  const dispatch = useDispatch();
  const handleSwitchChange = (checked: boolean, event: MouseEvent, id: string) => {
    dispatch(updateSettings({[id]: checked}));
  }

  return (
    <div className={`${styles.settingsWrapper}`}>
        <label className={`${styles.switchWrapper} d-flex align-items-center justify-content-between p-4`}>
          <span className={`${styles.switchLabel}`}>Run on Startup</span>
          <Switch id="runOnStartup" checked={settings.runOnStartup} onChange={handleSwitchChange} onColor="#0093d9" offColor="#1f0821"/>
        </label>
      <h1 className={`${styles.settingsHeader} pageHeader text-center`}>Settings</h1>

    </div>
  );
};

export default Settings;
