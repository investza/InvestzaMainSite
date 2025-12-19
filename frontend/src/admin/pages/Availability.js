import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaSave,
  FaTrashAlt,
  FaCheck,
  FaTimes,
  FaCalendarCheck
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Availability.module.css";

import {
  saveCallHandlerUnavailabilitySlots,
  savePortfolioUnavailabilitySlots,
  getPortfolioUnavailabilities,
  getCallHandlerUnavailabilities
} from "../../api/flowApi";

function Availability() {

  // -----------------------------
  // State
  // -----------------------------
  const [adminRole, setAdminRole] = useState("");
  const [adminId, setAdminId] = useState("");
  const [selectedDate, setSelectedDate] = useState(getValidToday());
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveFlag, setSaveFlag] = useState(true);

  // -----------------------------
  // On Mount → Get Role & ID
  // -----------------------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAdminRole(user?.adminRole || "");
    setAdminId(user?.adminId || "");
  }, []);

  // Fetch once role + id is available
  useEffect(() => {
    if (adminRole && adminId) {
      fetchUnavailabilitiesByRole(selectedDate);
    }
  }, [adminRole, adminId]);

  // -----------------------------
  // Helpers
  // -----------------------------
  function getValidToday() {
    const today = new Date();
    if (today.getDay() === 0) today.setDate(today.getDate() + 1);
    return today;
  }

  const formatDate = (date) => {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().split("T")[0];
  };

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const getThreeMonthsFromToday = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // -----------------------------
  // Time Slots
  // -----------------------------
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM"
  ];

  const formatSlotForUI = (apiSlot) => {
    const [h, m] = apiSlot.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${m} ${suffix}`;
  };

  const formatSlotForAPI = (uiSlot) => {
    let [time, period] = uiSlot.split(" ");
    let [hour, minute] = time.split(":");

    hour = Number(hour);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${String(hour).padStart(2, "0")}:${minute}`;
  };

  // -----------------------------
  // FETCH UNAVAILABILITIES
  // -----------------------------
  const fetchUnavailabilitiesByRole = async (date) => {
    if (!adminRole || !adminId) return;

    try {
      setLoading(true);
      const dateStr = formatDate(date);
      let response;

      if (adminRole === "CALL_HANDLER") {
        response = await getCallHandlerUnavailabilities(dateStr, adminId);
      }

      if (adminRole === "PORTFOLIO_HANDLER") {
        response = await getPortfolioUnavailabilities(dateStr, adminId);
      }

      // console.log(response);

      const status =
        response?.data && "status" in response.data
          ? response.data.status
          : true;

      if (!status) {
        setSaveFlag(true);
        setUnavailableSlots([]);
        return;
      }

      const apiSlots = response.data?.unavailableSlots || [];
      setSaveFlag(false);

      const formattedSlots = apiSlots.map(
        (slot) => `${dateStr}-${formatSlotForUI(slot)}`
      );

      setUnavailableSlots(formattedSlots);

    } catch (error) {
      console.error("Failed to fetch unavailabilities", error);
      setUnavailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Slot Handling
  // -----------------------------
  const toggleSlot = (slot) => {
    const dateStr = formatDate(selectedDate);
    const key = `${dateStr}-${slot}`;

    setUnavailableSlots((prev) =>
      prev.includes(key)
        ? prev.filter((s) => s !== key)
        : [...prev, key]
    );
  };

  const isUnavailable = (slot) => {
    const dateStr = formatDate(selectedDate);
    return unavailableSlots.includes(`${dateStr}-${slot}`);
  };

  // -----------------------------
  // SAVE
  // -----------------------------
const handleSave = async () => {
  if (!adminRole || !adminId) return;

  try {
    setLoading(true);
    const dateStr = formatDate(selectedDate);

    const apiSlots = unavailableSlots
      .filter((s) => s.startsWith(dateStr))
      .map((s) => s.split("-").pop())
      .map(formatSlotForAPI);         

    const payload = {
      adminId,
      date: dateStr,
      timeSlots: apiSlots
    };

    if (adminRole === "CALL_HANDLER") {
      await saveCallHandlerUnavailabilitySlots(payload);
    }

    if (adminRole === "PORTFOLIO_HANDLER") {
      await savePortfolioUnavailabilitySlots(payload);
    }

    // console.log("Payload sent:", payload);
    setSaveFlag(false);

  } catch (err) {
    console.error(err);
    alert("Failed to save availability");
  } finally {
    setLoading(false);
  }
};


  const handleClear = () => {
    const dateStr = formatDate(selectedDate);
    setUnavailableSlots((prev) =>
      prev.filter((s) => !s.startsWith(dateStr))
    );
    setSaveFlag(true);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className={styles.availabilityContainer}>
      <h1>
        <FaCalendarCheck className={styles.titleIcon} />
        Availability
      </h1>

      <div className={styles.typeSelector}>
        <label>Select Booking Type</label>

        {adminRole === "CALL_HANDLER" && (
          <p className={styles.readOnlyText}>Call Booking Availability</p>
        )}

        {adminRole === "PORTFOLIO_HANDLER" && (
          <p className={styles.readOnlyText}>Review Portfolio Availability</p>
        )}
      </div>

      <div className={styles.datePickerWrapper}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            fetchUnavailabilitiesByRole(date);
          }}
          filterDate={(date) => date.getDay() !== 0}
          minDate={getToday()}
          maxDate={getThreeMonthsFromToday()}
          className={styles.datePicker}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className={styles.slotsContainer}>
        <h3>Select unavailable slots for {formatDate(selectedDate)}</h3>

        <div className={styles.slotsGrid}>
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`${styles.slotBtn} ${
                isUnavailable(slot) ? styles.unavailable : ""
              }`}
              onClick={() => toggleSlot(slot)}
            >
              {slot}
              {isUnavailable(slot) ? <FaTimes /> : <FaCheck />}
            </button>
          ))}
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.saveBtn} onClick={handleSave}>
            <FaSave /> {saveFlag ? "Save" : "Update"}
          </button>

          <button className={styles.clearBtn} onClick={handleClear}>
            <FaTrashAlt /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Availability;
