import React from "react";

import styles from "./UrlItem.module.css";

import addItemPath from "../../../public/static/images/add-item.svg";
import deleteItemPath from "../../../public/static/images/delete-item.svg";

const UrlItem = (props: { addItem?: boolean }) => {
  if (props.addItem) {
    return (
      <div className={`${styles.urlItem} ${styles.addUrl} justify-content-center mt-3 d-flex align-items-center`}>
        <img src={addItemPath} alt="add-url" className={`${styles.addUrlImage}`} />
      </div>
    );
  } else {
    return (
      <div
        className={`${styles.urlItem} mt-3 d-flex align-items-center justify-content-between`}
      >
        <p className={`${styles.urlText}`}>google.com</p>
        <button><i className="fi fi-ss-trash" /></button>
      </div>
    );
  }
};

export default UrlItem;
