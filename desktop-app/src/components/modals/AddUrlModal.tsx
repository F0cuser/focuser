import React from "react";
import { useState } from "react";
import ReactModal from "react-modal";

import styles from "./AddUrlModal.module.css";
import modalStyles from "./Modal.module.css";

import closeModalPath from "../../../public/static/images/close-modal.svg";

const AddUrl = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ReactModal
      isOpen={isOpen}
      className={`text-center p-5 ${modalStyles.modalWrapper} w-100`}
      style={{overlay: {
        'backgroundColor': 'rgba(0,0,0,0.75)',
        'padding': '10% 20%',
      }}}
    >
      <div className={`${modalStyles.exitButtonWrapper}`}>
        <img
          onClick={() => setIsOpen(false)}
          className={`${modalStyles.closeModalButton}`}
          src={closeModalPath}
          alt="close-modal"
        />
      </div>
      <div className={`${modalStyles.mainContentWrapper} d-flex flex-column justify-content-between h-75`}>
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
      </div>
    </ReactModal>
  );
};

export default AddUrl;
