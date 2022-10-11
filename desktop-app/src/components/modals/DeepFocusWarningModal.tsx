import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../utils/reducers/modal";
import styles from "./DeepFocusWarningModal.module.css";

const DeepFocusWarningModal = (props: { toggleTimer: () => void }) => {
  const dispatch = useDispatch();

  const confirmTimer = () => {
    props.toggleTimer();
    dispatch(closeModal());
  };

  return (
    <React.Fragment>
      <h1 className={`${styles.modalHeader} mt-2`}>Warning</h1>
      <p className={`${styles.modalText}`}>
        Deep focus mode means you will{" "}
        <span style={{ fontWeight: "bolder", color: "var(--tertiary-color)" }}>
          not be able to pause blocking
        </span>{" "}
        until the timer runs out (or until your computer restarts)
        <br />
        <br />
        Are you sure you wish to continue?
      </p>
      <div
        className={`${styles.actionButtonsWrapper} d-flex justify-content-end gap-3 mb-5`}
      >
        <button onClick={confirmTimer}>Yes!</button>
        <button onClick={() => dispatch(closeModal())}>No...</button>
      </div>
    </React.Fragment>
  );
};

export default DeepFocusWarningModal;
