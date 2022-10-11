import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettings } from "../../utils/reducers/settings";
import { RootState } from "../../utils/store";
import SettingsOption from "../reusables/SettingsOption";


import styles from "./Settings.module.css";

const Settings = () => {
  const settings = useSelector((state: RootState) => state.settings.settings);
  const dispatch = useDispatch();
  
  const handleSwitchChange = (checked: boolean, _: MouseEvent, id: string) => {
    dispatch(updateSettings({newSettings: {[id]: checked}}));
  }

  return (
    <div className={`${styles.settingsWrapper}`}>
      <SettingsOption settingName="runOnStartup" settingStatus={settings.runOnStartup} handleSwitchChange={handleSwitchChange} />
      <h1 className={`${styles.settingsHeader} pageHeader text-center`}>Settings</h1>

    </div>
  );
};

export default Settings;
