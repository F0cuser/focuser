import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../utils/reducers/modal";
import { addUrl } from "../../utils/reducers/urls";
import { RootState } from "../../utils/store";

import styles from "./AddUrlModal.module.css";

const AddUrl = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.urls.urls);

  useEffect(() => document.getElementById('addUrlInput')?.focus(), [])

  const addUrlToList = (shouldClose: boolean) => {
    const urlInputElem: HTMLInputElement = document.getElementById("addUrlInput") as HTMLInputElement;
    const newUrl: string = urlInputElem.value;
    urlInputElem.value = '';
    if (urls.includes(newUrl)) {
      toast.error(`${newUrl} already exists in your blocked URL list!`);
      return;
    }
    dispatch(addUrl(newUrl));
    toast.success(`${newUrl} has been successfully added!`);
    if (shouldClose) {
      dispatch(closeModal())
    }
  }

  return (
    <React.Fragment>
      <h1 className={`${styles.modalHeader} mt-2`}>Add URL</h1>
      <input
        className={`${styles.addUrlInput}`}
        placeholder="e.g. annoying-website.com"
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
