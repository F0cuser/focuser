import React from "react";
import styles from './UrlSelect.module.css';

import UrlItem from "../reusables/UrlItem";




const UrlSelect = () => {
    return (
      <div className={`${styles.urlSelectWrapper} text-center`}>
        <div className={`d-flex flex-column align-items-center`}>
          <div className={`${styles.urlListWrapper} d-flex flex-column align-items-center`}>
            <UrlItem />
            <UrlItem />
            <UrlItem />
            <UrlItem />
            <UrlItem />
            <UrlItem />
            <UrlItem />
          </div>
          <UrlItem addItem />

        </div>
        <h1 className={`${styles.urlHeader}`}>Website URLs</h1>

      </div>  
    );
}

export default UrlSelect;
