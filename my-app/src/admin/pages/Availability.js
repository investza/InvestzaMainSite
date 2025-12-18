// import React, { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaSave,
//   FaTrashAlt,
//   FaCheck,
//   FaTimes,
//   FaCalendarCheck
// } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "./Availability.module.css";

// import { adminSaveUnavailabilitySlots } from "../../api/flowApi";

// function Availability() {
//   // Format Date → YYYY-MM-DD
//   const formatDate = (date) => {
//     if (!date) return "";
//     const offset = date.getTimezoneOffset();
//     const local = new Date(date.getTime() - offset * 60000);
//     return local.toISOString().split("T")[0];
//   };

//   const getValidToday = () => {
//     const today = new Date();
//     if (today.getDay() === 0) today.setDate(today.getDate() + 1);
//     return today;
//   };

//   const [selectedDate, setSelectedDate] = useState(getValidToday());
//   const [unavailableSlots, setUnavailableSlots] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const timeSlots = [
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//     "6:00 PM"
//   ];

//   // Convert "10:00 AM" → "10:00"
//   const formatSlotForAPI = (slot) => {
//     const [time, modifier] = slot.split(" ");
//     let [hours, minutes] = time.split(":");

//     if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
//     if (modifier === "AM" && hours === "12") hours = "00";

//     return `${hours.padStart(2, "0")}:${minutes}`;
//   };

//   const toggleSlot = (slot) => {
//     const dateStr = formatDate(selectedDate);
//     const key = `${dateStr}-${slot}`;

//     setUnavailableSlots((prev) =>
//       prev.includes(key)
//         ? prev.filter((s) => s !== key)
//         : [...prev, key]
//     );
//   };

//   const isUnavailable = (slot) => {
//     const dateStr = formatDate(selectedDate);
//     return unavailableSlots.includes(`${dateStr}-${slot}`);
//   };

//   // 🔥 API CALL HERE
//   const handleSave = async () => {
//     const dateStr = formatDate(selectedDate);

//     const selectedDaySlots = unavailableSlots
//       .filter((s) => s.startsWith(dateStr))
//       .map((s) => s.split("-")[1])
//       .map(formatSlotForAPI);

//     if (selectedDaySlots.length === 0) {
//       alert("Please select at least one time slot");
//       return;
//     }

//     const payload = {
//       //adminId: "ADD_USER_ID_HERE",
//       date: dateStr,
//       timeSlots: selectedDaySlots
//     };

//     try {
//       setLoading(true);
//         await adminSaveUnavailabilitySlots(payload);
//         alert("slots saved successfully");
//         handleClear();
//     } catch (error) {
//       console.error("Save failed:", error);
//       alert("Failed to save availability");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     const dateStr = formatDate(selectedDate);
//     setUnavailableSlots((prev) =>
//       prev.filter((s) => !s.startsWith(dateStr))
//     );
//   };

//   return (
//     <div className={styles.availabilityContainer}>
//       <h1>
//         <FaCalendarCheck className={styles.titleIcon} />
//         Availability
//       </h1>

//       {/* DATE PICKER */}
//       <div className={styles.datePickerWrapper}>
//         <FaCalendarAlt className={styles.calendarIcon} />
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           filterDate={(date) => date.getDay() !== 0}
//           minDate={new Date()}
//           maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
//           className={styles.datePicker}
//           dateFormat="yyyy-MM-dd"
//         />
//       </div>

//       <div className={styles.slotsContainer}>
//         <h3 className={styles.slotsTitle}>
//           <FaCalendarAlt className={styles.slotTitleIcon} />
//           Select unavailable slots for {formatDate(selectedDate)}
//         </h3>

//         <div className={styles.slotsGrid}>
//           {timeSlots.map((slot) => (
//             <button
//               key={slot}
//               className={`${styles.slotBtn} ${
//                 isUnavailable(slot) ? styles.unavailable : ""
//               }`}
//               onClick={() => toggleSlot(slot)}
//             >
//               {slot}
//               {isUnavailable(slot) ? (
//                 <FaTimes className={styles.slotStatusIcon} />
//               ) : (
//                 <FaCheck className={styles.slotStatusIcon} />
//               )}
//             </button>
//           ))}
//         </div>

//         <div className={styles.actionButtons}>
//           <button
//             className={styles.saveBtn}
//             onClick={handleSave}
//             disabled={loading}
//           >
//             <FaSave className={styles.btnIcon} />
//             {loading ? "Saving..." : "Save"}
//           </button>

//           <button className={styles.clearBtn} onClick={handleClear}>
//             <FaTrashAlt className={styles.btnIcon} />
//             Clear
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Availability;

import React, { useState } from "react";
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

// import {
//   adminSaveUnavailabilitySlots,
//   adminSaveReviewPortfolioUnavailabilitySlots // 👈 second API
// } from "../../api/flowApi";

function Availability() {
  // -----------------------------
  // Helpers
  // -----------------------------
  const formatDate = (date) => {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().split("T")[0];
  };

  const getValidToday = () => {
    const today = new Date();
    if (today.getDay() === 0) today.setDate(today.getDate() + 1);
    return today;
  };

  // -----------------------------
  // State
  // -----------------------------
  const [bookingType, setBookingType] = useState("CALL"); // 👈 DEFAULT
  const [selectedDate, setSelectedDate] = useState(getValidToday());
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Convert "10:00 AM" → "10:00"
  const formatSlotForAPI = (slot) => {
    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
    if (modifier === "AM" && hours === "12") hours = "00";

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

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
  // SAVE
  // -----------------------------
  const handleSave = async () => {
    // const dateStr = formatDate(selectedDate);

    // const selectedDaySlots = unavailableSlots
    //   .filter((s) => s.startsWith(dateStr))
    //   .map((s) => s.split("-")[1])
    //   .map(formatSlotForAPI);

    // if (selectedDaySlots.length === 0) {
    //   alert("Please select at least one time slot");
    //   return;
    // }

    // const payload = {
    //   date: dateStr,
    //   timeSlots: selectedDaySlots
    // };

    // try {
    //   setLoading(true);

    //   // 🔥 CONDITIONAL API CALL
    //   if (bookingType === "CALL") {
    //     await adminSaveUnavailabilitySlots(payload);
    //   } else {
    //     await adminSaveReviewPortfolioUnavailabilitySlots(payload);
    //   }

    //   alert("Slots saved successfully");
    //   handleClear();
    // } catch (error) {
    //   console.error("Save failed:", error);
    //   alert("Failed to save availability");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleClear = () => {
    const dateStr = formatDate(selectedDate);
    setUnavailableSlots((prev) =>
      prev.filter((s) => !s.startsWith(dateStr))
    );
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

      {/* BOOKING TYPE SELECT */}
      <div className={styles.typeSelector}>
        <label>Select Booking Type</label>
        <select
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          className={styles.select}
        >
          <option value="CALL">Call Booking Availability</option>
          <option value="PORTFOLIO">Review Portfolio Availability</option>
        </select>
      </div>

      {/* DATE PICKER */}
      <div className={styles.datePickerWrapper}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={(date) => date.getDay() !== 0}
           minDate={getToday()}                 // ✅ today
  maxDate={getThreeMonthsFromToday()} 
          // minDate={new Date()}
          // maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
          className={styles.datePicker}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className={styles.slotsContainer}>
        <h3 className={styles.slotsTitle}>
          Select unavailable slots for {formatDate(selectedDate)}
        </h3>

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
              {isUnavailable(slot) ? (
                <FaTimes className={styles.slotStatusIcon} />
              ) : (
                <FaCheck className={styles.slotStatusIcon} />
              )}
            </button>
          ))}
        </div>

        <div className={styles.actionButtons}>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={loading}
          >
            <FaSave className={styles.btnIcon} />
            {loading ? "Saving..." : "Save"}
          </button>

          <button className={styles.clearBtn} onClick={handleClear}>
            <FaTrashAlt className={styles.btnIcon} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Availability;
