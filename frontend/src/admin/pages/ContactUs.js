import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./ContactUs.module.css";
import {
  adminGetAllContacts,
  adminDeleteContact,
  adminUpdateContactStatus,
} from "../../api/flowApi"; // make sure these are imported

function ContactUs() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  /* ----------------------------
     FETCH ALL CONTACTS
  ----------------------------- */
  const fetchMessages = useCallback(async () => {
    try {
      const res = await adminGetAllContacts();
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /* ----------------------------
     DELETE MESSAGE
  ----------------------------- */
  const deleteMessage = useCallback(async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await adminDeleteContact(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Delete failed");
    }
  }, []);

  /* ----------------------------
     UPDATE STATUS
  ----------------------------- */
  const updateStatus = useCallback(async (id, status) => {
    try {
      await adminUpdateContactStatus(id, status);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Status update failed");
    }
  }, []);

  /* ----------------------------
     SEARCH + FILTER (Memoized)
  ----------------------------- */
  const filteredData = useMemo(() => {
    let result = messages;

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((msg) =>
        Object.values(msg)
          .join(" ")
          .toLowerCase()
          .includes(lowerSearch)
      );
    }

    return result;
  }, [messages, search]);

  /* ----------------------------
     PAGINATION
  ----------------------------- */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  /* ----------------------------
     VIEW MODAL
  ----------------------------- */
  const [viewData, setViewData] = useState(null);

  return (
    <div className={styles.pageContainer}>
      <h1>Contact Messages</h1>

      {/* SEARCH FILTER */}
      <input
        type="text"
        placeholder="Search here..."
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>

                <td>
                  <select
                    value={msg.status}
                    onChange={(e) => updateStatus(msg.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="DONE">Completed</option>
                  </select>
                </td>

                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() => setViewData(msg)}
                  >
                    View
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.prevBtn}
        >
          ⬅ Prev
        </button>

        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.pageBtn} ${page === pageNum ? styles.active : ""}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.nextBtn}
        >
          Next ➡
        </button>
      </div>

      {/* VIEW MODAL */}
      {viewData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Message Details</h2>

            <p><b>Name:</b> {viewData.name}</p>
            <p><b>Email:</b> {viewData.email}</p>
            <p><b>Subject:</b> {viewData.subject}</p>
            <p><b>Message:</b> {viewData.message}</p>
            <p><b>Status:</b> {viewData.status}</p>

            <button
              className={styles.closeBtn}
              onClick={() => setViewData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactUs;
