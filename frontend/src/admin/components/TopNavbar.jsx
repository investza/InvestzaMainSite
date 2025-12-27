import styles from "./TopNavbar.module.css";

function TopNavbar({ toggleSidebar }) {
  return (
    <div className={styles.topNavbar}>
      <div className={styles.leftSection}>
        <button className={styles.navToggle} onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className={styles.navTitle}>Dashboard</h1>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navUser}>
          <span>Admin</span>
          <div className={styles.profilePic}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
