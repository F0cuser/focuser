import React from "react";
import styles from './UrlSelect.module.css';

import UrlItem from "../reusables/UrlItem";




const UrlSelect = () => {
    return (
      <div className={`${styles.urlSelectWrapper} text-center`}>
        <h1 className={`${styles.urlHeader}`}>Website URLs</h1>
        <div className={`${styles.urlListWrapper} d-flex flex-column align-items-center`}>
          <UrlItem addItem />
          <UrlItem />
      
        </div>
      </div>  
    );
}

export default UrlSelect;