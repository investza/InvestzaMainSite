import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

import {
  adminGetContactStats,
  getReviewPortfolioStats,
  countEvents,
  adminGetCallStats,
  countAdmin
} from "../../api/flowApi";

// Icons
import { FaClock, FaCheckCircle } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    callBookings: {},
    contactMessages: {},
    reviewPortfolio: {},       
    events: 0,               
    admins:0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [
          contactStats,
          reviewStats,
          eventStats,
          CallBookingsstats,
          TotalAdmin
        ] = await Promise.all([
          adminGetContactStats(),        // returns { total, pending, done }
          getReviewPortfolioStats(),     // returns { total, pending, done }
          countEvents(),                  // returns { past, upcoming, count }
          adminGetCallStats(),
          countAdmin()               
        ]);

        // console.log(CallBookingsstats);

        setStats((prev) => ({
          ...prev,
          contactMessages: contactStats.data,
          reviewPortfolio: reviewStats.data,
          events: eventStats.data?.count,
          callBookings: CallBookingsstats.data,
          admins: TotalAdmin.data?.count,
        }));
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <div className={styles.dashboardContainer}>Loading...</div>;
  }

  const {
    callBookings,
    contactMessages,
    reviewPortfolio,
    admins,
    events
  } = stats;

  // ---------------- TOTAL ENTRIES
  // Includes real stats
  const total =
    callBookings.total +
    (contactMessages?.total || 0) +
    (reviewPortfolio?.total || 0);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <h1>Welcome to Dashboard</h1>
        <p>Overview of your application data.</p>

        <div className={styles.statsGrid}>

          {/* ---------------- TOTAL */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{total}</div>
            <div className={styles.statLabel}>Total Entries</div>
          </div>

          {/* ---------------- CALL BOOKINGS (DUMMY) */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{callBookings.total}</div>
            <div className={styles.statLabel}>Call Bookings</div>
            <div className={styles.statusBadges}>
              <span className={`${styles.badge} ${styles.pending}`}>
                <FaClock size={14} /> {callBookings.pending} Pending
              </span>
              <span className={`${styles.badge} ${styles.completed}`}>
                <FaCheckCircle size={14} /> {callBookings.done} Completed
              </span>
            </div>
          </div>

          {/* ---------------- CONTACT MESSAGES */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {contactMessages?.total}
            </div>
            <div className={styles.statLabel}>Contact Messages</div>
            <div className={styles.statusBadges}>
              <span className={`${styles.badge} ${styles.pending}`}>
                <FaClock size={14} /> {contactMessages?.pending} Pending
              </span>
              <span className={`${styles.badge} ${styles.completed}`}>
                <FaCheckCircle size={14} /> {contactMessages?.done} Completed
              </span>
            </div>
          </div>

          {/* ---------------- REVIEW PORTFOLIO */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {reviewPortfolio?.total}
            </div>
            <div className={styles.statLabel}>Review Portfolio</div>
            <div className={styles.statusBadges}>
              <span className={`${styles.badge} ${styles.pending}`}>
                <FaClock size={14} /> {reviewPortfolio?.pending} Pending
              </span>
              <span className={`${styles.badge} ${styles.completed}`}>
                <FaCheckCircle size={14} /> {reviewPortfolio?.done} Completed
              </span>
            </div>
          </div>

          {/* ---------------- USERS (DUMMY) */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{admins}</div>
            <div className={styles.statLabel}>Registered Admins</div>
          </div>

          {/* ---------------- EVENTS */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{events}</div>
            <div className={styles.statLabel}>Events</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
