import React from "react";

import styles from './TimerToggleButton.module.css';
import onOffPath from "../../../public/static/images/on-off.svg";

const TimerToggleButton = () => {
    return (
        <button className={`${styles.timerToggleButton} mt-5`}>
            <img src={onOffPath} alt="start timer" className={`${styles.timerToggleButtonImage}`}/>
        </button>
    )
}

export default TimerToggleButton;