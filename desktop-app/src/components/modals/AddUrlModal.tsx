import React from "react";

import styles from "./AddUrlModal.module.css";

const AddUrl = () => {
  return (
    <React.Fragment>
      <h1 className={`${styles.modalHeader} mt-2`}>Add URL</h1>
      <input
        className={`${styles.addUrlInput}`}
        placeholder="e.g. annoying-website.com"
      />
      <div
        className={`${styles.actionButtonsWrapper} d-flex justify-content-end gap-3`}
      >
        <button>Add Another</button>
        <button>Finish</button>
      </div>
    </React.Fragment>
  );
};

export default AddUrl;
