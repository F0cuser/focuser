import React from "react";

import styles from './TimerToggleButton.module.css';
import playPath from "../../../public/static/images/play.svg";
import pausePath from "../../../public/static/images/pause.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

const TimerToggleButton = (props: {
    disabled: boolean; toggleFunction: React.MouseEventHandler<HTMLButtonElement>
}) => {
    const isTimerActive = useSelector((state: RootState) => state.timer.isActive);
    return (
        <button className={`${styles.timerToggleButton} mt-5 ms-5`} onClick={props.toggleFunction} disabled={props.disabled}>
            <img src={isTimerActive ? pausePath : playPath} alt="start timer" className={`${styles.timerToggleButtonImage}`}/>
        </button>
    )
}

export default TimerToggleButton;