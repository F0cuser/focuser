import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../utils/reducers/modal";
import { setUrls } from "../../utils/reducers/urls";
import { RootState } from "../../utils/store";

import styles from "./AddUrlModal.module.css";

const AddUrl = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.urls.urls);
  const isTimerActive = useSelector((state: RootState) => state.timer.isActive);

  useEffect(() => {
    setupKeypressListeners();
    document.getElementById("addUrlInput")?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKeypress = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      addUrlToList(false);
      dispatch(closeModal());
      dispatch(openModal('addUrl'))
    }
    if (ev.key === "Escape") {
      dispatch(closeModal());
    }
  };

  const setupKeypressListeners = () => {
    document
      .getElementById("addUrlInput")
      ?.removeEventListener("mousedown", getKeypress, true);
    document
      .getElementById("addUrlInput")
      ?.addEventListener("keydown", getKeypress);
  };
  const addUrlToList = (shouldClose: boolean) => {
    const urlInputElem: HTMLInputElement = document.getElementById(
      "addUrlInput",
    ) as HTMLInputElement;
    const newUrl: string = urlInputElem.value;
    if (!newUrl) return;
    urlInputElem.value = "";
    if (urls.includes(newUrl)) {
      toast.error(`${newUrl} already exists in your blocked URL list!`);
      return;
    }
    dispatch(setUrls({ urls: [...urls, newUrl], timerActive: isTimerActive }));
    toast.success(`${newUrl} has been successfully added!`);
    document.getElementById("addUrlInput")?.focus();
    if (shouldClose) {
      dispatch(closeModal());
      return;
    }
    console.log(urls);
  };

  return (
    <React.Fragment>
      <h1 className={`${styles.modalHeader} mt-2`}>Add URL</h1>
      <input
        type="text"
        className={`${styles.addUrlInput}`}
        placeholder="annoying-website.com"
        id="addUrlInput"
        required
      />
      <div
        className={`${styles.actionButtonsWrapper} d-flex justify-content-end gap-3`}
      >
        <button onClick={() => addUrlToList(false)}>Add Another</button>
        <button onClick={() => addUrlToList(true)}>Finish</button>
      </div>
    </React.Fragment>
  );
};

export default AddUrl;
