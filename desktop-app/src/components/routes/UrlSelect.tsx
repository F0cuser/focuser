import React from "react";
import styles from "./UrlSelect.module.css";

import UrlItem from "../reusables/UrlItem";
import BaseModal from "../modals/BaseModal";
import AddUrl from "../modals/AddUrlModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";



const UrlSelect = () => {
  const urls = useSelector((state: RootState) => state.urls.urls);

  return (
    <div className={`${styles.urlSelectWrapper} text-center`}>
      <BaseModal modalId='addUrl'>
        <AddUrl />
      </BaseModal>
      <div className={`d-flex flex-column align-items-center`}>
        <div
          className={`${styles.urlListWrapper} d-flex flex-column align-items-center`}
        >
          {urls.map((url: string, _) => {
            return <UrlItem url={url}/>
          })}
        </div>
        <UrlItem addItem />
      </div>
      <h1 className={`${styles.urlHeader}`}>Website URLs</h1>
    </div>
  );
};

export default UrlSelect;
