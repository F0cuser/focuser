import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { channels } from '../../utils/shared/constants'
import { setUrlsFromSettings } from "../../utils/reducers/urls";

import styles from "./Sidebar.module.css";
import timerPath from "../../../public/static/images/timer.svg";
import logoPath from "../../../public/static/images/logo.svg";
import urlsPath from "../../../public/static/images/urls.svg";
import settingsPath from "../../../public/static/images/settings.svg";
import { useDispatch } from "react-redux";
import { getSettingsFromFile } from "../../utils/reducers/settings";

const { ipcRenderer } = window.require('electron');


const Sidebar = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.invoke(channels.READ_SETTINGS).then(results => {
      if (results.urls)
        dispatch(setUrlsFromSettings(results.urls))
      results = Object.fromEntries(Object.entries(results).filter(([key]) => !key.includes('urls')));
      dispatch(getSettingsFromFile(results))
    })
  }, [dispatch])



  return (
    <div className={styles.sidebar}>
      <div className={styles.brandWrapper}>
        <img src={logoPath} alt="logo" />
      </div>
      <nav className={styles.navLinksWrapper}>
        <ul>
          <li className="mb-4">
            <NavLink to="/" className={styles.navLink}>
              <div
                className={`${styles.navLink} d-flex align-items-center justify-content-between p-3`}
              >
                <img
                  className={`${styles.navLinkImage} d-inline`}
                  src={timerPath}
                  alt="timer"
                />
                <p className={`${styles.navLinkText} d-inline`}>Timer</p>
              </div>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/urls" className={styles.navLink}>
              <div
                className={`${styles.navLink} d-flex align-items-center justify-content-between p-3`}
              >
                <img
                  className={`${styles.navLinkImage} d-inline`}
                  src={urlsPath}
                  alt="urls"
                />
                <p className={`${styles.navLinkText} d-inline`}>Websites</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`${styles.bottomWrapper} d-block w-100`}>
        <NavLink to="/settings">
          <div className="p-3">
            <img
              className={`${styles.navLinkImage} d-inline`}
              src={settingsPath}
              alt="settings"
            />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
