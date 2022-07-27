import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../utils/store";
import { closeModal } from "../../utils/reducers/modal";

import ReactModal from "react-modal";
import modalStyles from "./Modal.module.css";

import closeModalPath from "../../../public/static/images/close-modal.svg";

const BaseModal = (props: { modalId: string; children: React.ReactChild }) => {
  const openModal = useSelector((state: RootState) => state.modal.openModal);
  const dispatch = useDispatch();

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={openModal === props.modalId}
      className={`text-center p-5 ${modalStyles.modalWrapper} w-100`}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "10% 20%",
        },
      }}
    >
      <div className={`${modalStyles.exitButtonWrapper}`}>
        <img
          onClick={() => dispatch(closeModal())}
          className={`${modalStyles.closeModalButton}`}
          src={closeModalPath}
          alt="close-modal"
        />
      </div>
      <div
        className={`${modalStyles.mainContentWrapper} d-flex flex-column justify-content-between h-75`}
      >
        {props.children}
      </div>
    </ReactModal>
  );
};

export default BaseModal;
