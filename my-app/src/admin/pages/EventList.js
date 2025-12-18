import React, { useEffect, useState } from "react";
import styles from "./EventList.module.css";

import AddEvent from "./AddEvent";

// API
import { getEvents,deleteEvent as deleteEventAPI } from "../../api/flowApi";

function EventList() {
  // ---------------- STATES ----------------
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  const [edit,setEdit] = useState(false);
  const [updateEvent,setUpdateEvent] = useState();

  // ---------------- FETCH EVENTS ----------------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        const apiEvents = res.data || res;
        setEvents(apiEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ---------------- FILTER LOGIC ----------------
  const filterEvents = (eventsArray) => {
    return eventsArray.filter((event) => {
      const matchSearch = event.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchMonth = filterMonth
        ? new Date(event.date).toLocaleString("default", { month: "long" }) === filterMonth
        : true;

      return matchSearch && matchMonth;
    });
  };

  const upcomingEvents = filterEvents(events.filter((e) => e.category === "upcoming"));
  const pastEvents = filterEvents(events.filter((e) => e.category === "past"));

  // ---------------- DELETE (UI ONLY) ----------------
  const deleteEvent = async (id) => {
    try{
      let res;
        if (window.confirm("Delete this event?")) {
          setEvents((prev) => prev.filter((event) => event.id !== id));
          res = deleteEventAPI(id);
          // console.log(res);
    }
    }catch(err) {
      alert(err || "error while deleteing the event");
    }

  };

  const handleEdit = (id) => {
    // console.log("Edit Clicked");
    let updatedEventArray = events.filter((e) => e.id === id);
    // console.log(updatedEventArray[0]);
    setUpdateEvent(updatedEventArray[0]);
    setEdit(true);
  }
  // ---------------- UI ----------------
  if (loading) return <p className={styles.loading}>Loading events...</p>;

  const renderEventCard = (event) => (
    <div className={styles.card} key={event.id}>
      <img
        src={event.images?.[0]}
        alt={event.title}
        className={styles.cardImage}
      />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardDate}>{new Date(event.date).toDateString()}</p>
        <p className={styles.cardDescription}>
          {event.description?.slice(0, 80)}...
        </p>
        <div className={styles.cardActions}>
          <button className={styles.editBtn} onClick={() => handleEdit(event.id)}>Edit</button>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteEvent(event.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {edit ? <AddEvent updateEvent={updateEvent}
  setUpdateEvent={setUpdateEvent} edit={edit} setEdit={setEdit}/> : <div className={styles.container}>
      <h1 className={styles.heading}>Event List</h1>

      {/* Search + Filter */}
      <div className={styles.topBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Filter by Month</option>
          {Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString("default", { month: "long" })
          ).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Upcoming Events */}
      <h2 className={styles.subHeading}>Upcoming Events</h2>
      {upcomingEvents.length > 0 ? (
        <div className={styles.cardGrid}>
          {upcomingEvents.map(renderEventCard)}
        </div>
      ) : (
        <p className={styles.emptyMessage}>No upcoming events.</p>
      )}

      {/* Past Events */}
      <h2 className={styles.subHeading}>Past Events</h2>
      {pastEvents.length > 0 ? (
        <div className={styles.cardGrid}>
          {pastEvents.map(renderEventCard)}
        </div>
      ) : (
        <p className={styles.emptyMessage}>No past events.</p>
      )}
    </div>}
    </>
  );
}

export default EventList;
