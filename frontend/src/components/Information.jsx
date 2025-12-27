import { React, useContext } from "react";
import styles from "./Information.module.css";
import { userDataContext } from "./contexts/userDataContext";

const Abhishek = "/team/abhishek.webp";
const groupPhoto = "/team/pm2.png";

const Information = () => {
  const { userData, /* setUserData */ } = useContext(userDataContext);

  return (
    <div className={styles["information-section"]}>
      <div className={styles["profile-badge"]}>
        <img src={Abhishek} alt="Abhishek" className={styles["profile-img"]} />
        <div className={styles["verified-badge"]}>✓</div>
      </div>
      {userData.category === "callScheduling" ? (
        <h1 className={styles.title}>
          Schedule a One on One with your Wealth Expert
        </h1>
      ) : (
        <h1 className={styles.title}>
          {" "}
          Review My Portfolio with Expert Guidance
        </h1>
      )}

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
          {/* <video
            src="https://d21ldyuk035o7q.cloudfront.net/websiteVideos/calendly_booking_video.mp4"
            className={styles["thumbnail-video"]}
            controls
          ></video> */}
          <img
            src={groupPhoto}
            alt="Team group photo"
            className={styles["thumbnail-video"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
