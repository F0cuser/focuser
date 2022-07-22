import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";
import timerPath from "../../../public/static/images/timer.svg"
import logoPath from "../../../public/static/images/logo.svg";
import urlsPath from "../../../public/static/images/urls.svg";
import appsPath from "../../../public/static/images/applications.svg";
import settingsPath from "../../../public/static/images/settings.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.brandWrapper}>
        <img src={logoPath} alt="logo" />
      </div>
      <nav className={styles.navLinksWrapper}>
        <ul>
          <li className="mb-4">
            <NavLink to="/" className={styles.navLink}>
              <div className={`${styles.navLink} d-flex align-items-center justify-content-between p-3`}>
                <img className={`${styles.navLinkImage} d-inline`} src={timerPath} alt="timer" />
                <p className={`${styles.navLinkText} d-inline`}>Timer</p>
              </div>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/urls" className={styles.navLink}>
              <div className={`${styles.navLink} d-flex align-items-center justify-content-between p-3`}>
                <img className={`${styles.navLinkImage} d-inline`} src={urlsPath} alt="urls" />
                <p className={`${styles.navLinkText} d-inline`}>URLs</p>
              </div>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/apps" className={styles.navLink} >
              <div className={`${styles.navLink} d-flex align-items-center justify-content-between p-3`}>
                <img className={`${styles.navLinkImage} d-inline`} src={appsPath} alt="urls" />
                <p className={`${styles.navLinkText} d-inline`}>Apps</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`p-3 ${styles.bottomWrapper}`}>
        <NavLink to="/settings" >
            <img className={`${styles.navLinkImage} d-inline`} src={settingsPath} alt="settings" />
          </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
