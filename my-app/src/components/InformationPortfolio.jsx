import React from "react";
import styles from "./Information.module.css";
import Abhishek from "../assets/abhishek.webp";
import groupPhoto from "../assets/pm2.png";

const InformationPortfolio = () => {
  return (
    <div className={styles["information-section"]}>
      <div className={styles["profile-badge"]}>
        <img src={Abhishek} alt="Abhishek" className={styles["profile-img"]} />
        <div className={styles["verified-badge"]}>✓</div>
      </div>
      <h1 className={styles.title}>
        Review My Portfolio with Expert Guidance
      </h1>
      <p className={styles.subtitle}>
        No charges, No Commitments • Just valuable insights.
      </p>
      <p className={styles.description}>
        Be in control of your finances and understand how Investza can help you
        grow, preserve and, if need be, even help pass on your wealth to your
        next kin. We help you achieve financial success confidently.
      </p>
      <div className={styles["video-card"]}>
        <div className={styles["video-thumbnail"]}>
          <img
            src={groupPhoto}
            className={styles["thumbnail-video"]}
            alt="Team"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default InformationPortfolio;
