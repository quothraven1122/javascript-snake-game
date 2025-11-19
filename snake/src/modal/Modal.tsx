import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface Modal {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: Modal) {
  return createPortal(
    <div onClick={onClose} className={styles.background}>
      <div className={styles.modal}>
        <p>{title}</p>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
