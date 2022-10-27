import React from "react";
import Switch from "react-switch";
import styles from "./SettingsOption.module.css";

import { useSelector, useDispatch } from "react-redux";
import { updateSettings } from "../../utils/reducers/settings";
import { RootState } from "../../utils/store";

const SettingsOption = (props: {
  settingName: string;
  settingLabel: string;
  isDisabled: boolean;
}) => {
  const settings = useSelector((state: RootState) => state.settings.settings);
  const dispatch = useDispatch();
  const handleSwitchChange = (checked: boolean, _: MouseEvent, id: string) => {
    dispatch(updateSettings({ newSettings: { [id]: checked } }));
  };
  return (
    <label
      className={`${styles.switchWrapper} d-flex align-items-center justify-content-between p-4 ${props.isDisabled ? styles.disabled : ""}`}
    >
      <span className={`${styles.switchLabel}`}>{props.settingLabel}</span>
      <Switch
        disabled={props.isDisabled}
        id={props.settingName}
        checked={settings[props.settingName]}
        onChange={handleSwitchChange}
        onColor="#0093d9"
        offColor="#1f0821"
      />
    </label>
  );
};

export default SettingsOption;
