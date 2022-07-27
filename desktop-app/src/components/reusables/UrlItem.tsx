import React from "react";
import { useDispatch } from 'react-redux'

import { openModal } from "../../utils/reducers/modal";

import styles from "./UrlItem.module.css";

import addItemPath from "../../../public/static/images/add-item.svg";
import deleteItemPath from "../../../public/static/images/delete-item.svg";

const UrlItem = (props: { addItem?: boolean }) => {
  const dispatch = useDispatch();
  if (props.addItem) {

    
    return (
      <div className={`${styles.urlItem} ${styles.addUrl} justify-content-center mt-3 d-flex align-items-center`}
      onClick={() => dispatch(openModal('addUrl'))}>
        <img src={addItemPath} alt="add-url" className={`${styles.addUrlImage}`} />
      </div>
    );
  } else {
    return (
      <div
        className={`${styles.urlItem} mt-3 d-flex align-items-center justify-content-between`}
      >
        <p className={`${styles.urlText}`}>google.com</p>
        <img
          className={`${styles.urlImage} ${styles.deleteItemImage}`}
          src={deleteItemPath}
          alt="delete-url"
        />
      </div>
    );
  }
};

export default UrlItem;
