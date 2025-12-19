import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.description}>
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        className={styles.homeBtn}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
