import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";

import { openModal } from "../../utils/reducers/modal";
import toast from "react-hot-toast";

import styles from "./UrlItem.module.css";

import addItemPath from "../../../public/static/images/add-item.svg";
import deleteItemPath from "../../../public/static/images/delete-item.svg";
import { removeUrl } from "../../utils/reducers/urls";

const UrlItem = (props: { addItem?: boolean; url?: string }) => {
  const isTimerActive = useSelector((state: RootState) => state.timer.isActive);
  const isDeepMode = useSelector(
    (state: RootState) => state.settings.settings.deepFocus,
  );
  const areControlsDisabled = isTimerActive && isDeepMode;

  const removeUrlItem = () => {
    dispatch(removeUrl({ url: props.url, timerActive: isTimerActive }));
    toast.success(`Successfully removed ${props.url}!`);
  };
  const dispatch = useDispatch();
  if (props.addItem) {
    return (
      <button
        className={`${styles.urlItem} ${styles.addUrl} justify-content-center mt-3 d-flex align-items-center`}
        disabled={areControlsDisabled}
        onClick={() => dispatch(openModal("addUrl"))}
      >
        <img
          src={addItemPath}
          alt="add-url"
          className={`${styles.addUrlImage}`}
        />
      </button>
    );
  } else {
    return (
      <div
        className={`${styles.urlItem} mt-3 d-flex align-items-center justify-content-between`}
      >
        <p className={`${styles.urlText}`}>{props.url}</p>
        <button disabled={areControlsDisabled} className={`${styles.noStyle} ${styles.deleteItemButton}`} onClick={removeUrlItem}>
          <img
            className={`${styles.urlImage} ${styles.deleteItemImage}`}
            src={deleteItemPath}
            alt="delete-url"
          />
        </button>
      </div>
    );
  }
};

export default UrlItem;
