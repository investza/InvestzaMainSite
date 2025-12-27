import { React, useState } from "react";
import styles from "./ShowQR.module.css";
import { useNavigate } from "react-router-dom";
const QrImg = "/assets/QrOverlay.png";

const ShowQR = () => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => navigate("/wealth-tracker"), 250); // match zoomOut duration
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${closing ? styles.modalClosing : ""}`}>
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>

        <div className={styles.qrWrapper}>
          <img className={styles.qrImg} src={QrImg} alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default ShowQR;
