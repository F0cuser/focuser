import React from "react";
import styles from './UrlSelect.module.css';

import addItemPath from "../../../public/static/images/add-item.svg";
import deleteItemPath from "../../../public/static/images/delete-item.svg";


const UrlSelect = () => {
    return (
      <div className={`${styles.urlSelectWrapper} text-center`}>
        <h1 className={`${styles.urlHeader}`}>Website URLs</h1>
        <div className={`${styles.urlListWrapper} d-flex flex-column align-items-center`}>
          <div className={`${styles.urlItem} ${styles.addUrl} text-center`}>
            <img
                  src={addItemPath}
                  alt="add-url"
                />
          </div>
          <div className={`${styles.urlItem} mt-3 d-flex align-items-center justify-content-between`}>
            <p className={`${styles.urlText}`}>google.com</p>
            <img
                  className={`${styles.urlImage}`}
                  src={deleteItemPath}
                  alt="delete-url"
                />
          </div>
          
        </div>
      </div>  
    );
}

export default UrlSelect;