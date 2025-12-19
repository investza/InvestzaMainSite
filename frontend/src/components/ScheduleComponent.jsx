import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import styles from "./ScheduleComponent.module.css";
import { useNavigate } from "react-router-dom";

import { checkSlot } from "../api/flowApi";
import { checkSlot_reviewPortfolio } from "../api/flowApi";

import { userDataContext } from "./contexts/userDataContext";

const ScheduleComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slotAvailability, setSlotAvailability] = useState({});

  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(userDataContext);

  // ---------------- LOCAL DATE FIX ----------------
  const formatLocalDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  // ---------------- CLOSE CALENDAR ----------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  // ---------------- 24-HOUR CONVERT ----------------
  const convertTo24Hour = (time12h) => {
    let [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") hours = String(Number(hours) + 12);
    if (modifier === "AM" && hours === "12") hours = "00";

    return `${hours}:${minutes}:00`;
  };

  // ---------------- FETCH SLOTS WHEN DATE SELECTED ----------------
  useEffect(() => {
    if (!selectedDate) return;

    const backendDate = formatLocalDate(selectedDate);

    const fetchSlots = async () => {
      try {
        let res;

        if (userData.category === "portfolioReview") {
          res = await checkSlot_reviewPortfolio(backendDate);
        } else {
          res = await checkSlot(backendDate);
        }

        const mapped = {};
        res.data.slots.forEach((slot) => {
          const [h, m] = slot.time.split(":");
          let hour = Number(h);
          const ampm = hour >= 12 ? "PM" : "AM";
          if (hour === 0) hour = 12;
          else if (hour > 12) hour -= 12;

          const formattedTime = `${hour}:${m} ${ampm}`;
          mapped[formattedTime] = slot.available;
        });

        setSlotAvailability(mapped);
      } catch (err) {
        console.error("Slot fetch error:", err);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  // ---------------- CONFIRM ----------------
  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    const backendDate = formatLocalDate(selectedDate);
    const backendTime = convertTo24Hour(selectedTime);

    // ---- Final safety check ONLY for selected slot ----
    if (slotAvailability[selectedTime] === 0) {
      alert("This slot is no longer available. Please choose another.");
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Save for UI screen
    // setData((prev) => ({
    //   ...prev,
    //   time: selectedTime,
    //   date: formattedDate,
    // }));

    // Save for backend
    setUserData((prevUserData) => ({
      ...prevUserData,
      time: backendTime,
      date: backendDate,
    }));

    navigate("/emailDetails");
  };

  // ---------------- HELPERS ----------------
  const isSunday = (date) => date.getDay() === 0;

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Minimum selectable date is tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return date < tomorrow;
  };

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ width: "100%", backgroundColor: "#1a1a1a" }}>
      <div className={styles["schedule-wrapper"]}>
        <div className={styles.header}>
          <h2>Select date and time</h2>
        </div>

        {/* -------------------------------- DATE PICKER -------------------------------- */}
        <div className={styles["date-picker-container"]} ref={calendarRef}>
          <label className={styles["date-label"]}>Select a date:</label>

          <button
            className={`${styles["date-input"]} ${
              showCalendar ? styles.active : ""
            }`}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <div className={styles["date-input-content"]}>
              <Calendar size={20} className={styles["date-input-icon"]} />
              <span
                className={`${styles["date-input-text"]} ${
                  !selectedDate ? styles.placeholder : ""
                }`}
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Choose your date"}
              </span>
            </div>
            <ChevronRight size={20} className={styles["date-input-arrow"]} />
          </button>

          {showCalendar && (
            <div className={styles["calendar-dropdown"]}>
              <div className={styles["calendar-header"]}>
                <button
                  className={styles["nav-btn"]}
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                >
                  <ChevronLeft size={18} />
                </button>
                <span className={styles["month-year"]}>{monthName}</span>
                <button
                  className={styles["nav-btn"]}
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className={styles["day-names-grid"]}>
                {dayNames.map((day) => (
                  <div key={day} className={styles["day-name"]}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={styles["days-grid"]}>
                {calendarDays.map((date, idx) => {
                  const isDisabled = !date || isSunday(date) || isPast(date);
                  const isSelected =
                    selectedDate &&
                    date &&
                    selectedDate.toDateString() === date.toDateString();
                  const isTodayDate = date && isToday(date);

                  return (
                    <button
                      key={idx}
                      className={`${styles.day} ${
                        isTodayDate && !isDisabled ? styles.today : ""
                      } ${isSelected ? styles.selected : ""}`}
                      onClick={() => {
                        if (!isDisabled) {
                          setSelectedDate(date);
                          setShowCalendar(false); // close calendar on select
                        }
                      }}
                      disabled={isDisabled}
                    >
                      {date ? date.getDate() : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ----------------------------- TIME SLOTS ----------------------------- */}
        <div className={styles["duration-info"]}>
          <div className={styles.dot}></div>
          <span className={styles["duration-text"]}>
            30 min call (Indian Standard Time)
          </span>
        </div>

        <div className={styles["time-section"]}>
          <div className={styles["time-grid"]}>
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={slotAvailability[time] === 0}
                className={`${styles["time-btn"]} 
                  ${selectedTime === time ? styles.active : ""} 
                  ${slotAvailability[time] === 0 ? styles.disabled : ""}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------------------- INFO + CONFIRM ---------------------------- */}
        <div className={styles["info-box"]}>
          <div className={styles.icon}>💡</div>
          <span className={styles["info-text"]}>
            2,216 users scheduled free meetings with Investza in the past 3
            months
          </span>
        </div>

        <button className={styles["confirm-btn"]} onClick={handleConfirm}>
          Confirm time slot
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ScheduleComponent;
