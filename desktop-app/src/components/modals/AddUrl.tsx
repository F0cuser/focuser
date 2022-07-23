import React from 'react';
import { useState } from 'react';
import ReactModal from 'react-modal';

import styles from './AddUrl.module.css';

const AddUrl = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ReactModal isOpen={isOpen} className={`text-center p-5 ${styles.modalWrapper}`}>
            <h1 className={`${styles.modalHeader}`}>Add URL</h1>
            
        </ReactModal>
    )
}

export default AddUrl;