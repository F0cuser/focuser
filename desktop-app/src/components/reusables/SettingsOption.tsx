import React from "react";
import Switch from "react-switch";
import styles from "./SettingsOption.module.css";

const SettingsOption = (props: {
  settingName: string;
  settingStatus: boolean;
  handleSwitchChange: (
    checked: boolean,
    event: MouseEvent | React.SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
    id: string,
  ) => void;
}) => {
  return (
    <React.Fragment>
      <label
        className={`${styles.switchWrapper} d-flex align-items-center justify-content-between p-4`}
      >
        <span className={`${styles.switchLabel}`}>Run on Startup</span>
        <Switch
          id={props.settingName}
          checked={props.settingStatus}
          onChange={props.handleSwitchChange}
          onColor="#0093d9"
          offColor="#1f0821"
        />
      </label>
    </React.Fragment>
  );
};

export default SettingsOption;
