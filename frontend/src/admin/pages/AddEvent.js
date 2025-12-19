// import React, { useState, useEffect } from "react";
// import styles from "./AddEvent.module.css";

// // APIs
// import {
//   createEvent,
//   uploadEventImages,
// } from "../../api/flowApi";

// function AddEvent({ updateEvent, setUpdateEvent, edit, setEdit }) {
//   // ---------------- FORM STATES ----------------
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [details, setDetails] = useState("");
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const [date, setDate] = useState(""); // single date string yyyy-mm-dd

//   // ---------------- UI STATES ----------------
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   // ---------------- HELPERS ----------------
//   const formatDateForAPI = () => date;

//   const formatDateDisplay = () => {
//     if (!date) return "--";
//     const d = new Date(date);
//     return d.toLocaleDateString("en-GB"); // format as DD/MM/YYYY
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setDetails("");
//     setImages([]);
//     setPreviews([]);
//     setDate("");
//   };

//   // ---------------- IMAGE HANDLER ----------------
//   const handleImageChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const combined = [...images, ...selectedFiles].slice(0, 10);
//     setImages(combined);
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const clearAllImages = () => {
//     setImages([]);
//     setPreviews([]);
//   };

//   // ---------------- IMAGE PREVIEW EFFECT ----------------
//   useEffect(() => {
//     if (!images.length) {
//       setPreviews([]);
//       return;
//     }

//     const urls = images.map((file) =>
//       URL.createObjectURL(file)
//     );

//     setPreviews(urls);

//     return () => {
//       urls.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [images]);

//   // ---------------- SUBMIT HANDLER ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!date) {
//       setSubmitStatus({
//         type: "error",
//         message: "Please select a valid date"
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       let uploadedImageUrls = [];

//       if (images.length > 0) {
//         const uploadRes = await uploadEventImages(images);
//         uploadedImageUrls = uploadRes.urls || uploadRes.data?.urls || [];
//       }

//       const payload = {
//         title,
//         description,
//         date: formatDateForAPI(),
//         images: uploadedImageUrls,
//         details: [details]
//       };

//       await createEvent(payload);

//       setSubmitStatus({
//         type: "success",
//         message: "Event created successfully!"
//       });

//       resetForm();
//     } catch (error) {
//       console.error("Event creation failed:", error);
//       setSubmitStatus({
//         type: "error",
//         message: "Failed to create event. Please try again."
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ---------------- MIN DATE (today) ----------------
//   const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>Add New Event</h1>

//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label>Event Title *</label>
//           <input
//             type="text"
//             value={title}
//             placeholder="Enter event title"
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             maxLength={100}
//           />
//           <div className={styles.charCounter}>{title.length}/100</div>
//         </div>

//         {/* Date Picker */}
//         <div className={styles.formGroup}>
//           <label>Event Date *</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             min={today} // only allow today or future
//             required
//             className={styles.dateInput}
//           />
//           <div className={styles.selectedDate}>
//             <span className={styles.dateLabel}>Selected Date:</span>
//             <span className={styles.datePreview}>{formatDateDisplay()}</span>
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Description *</label>
//           <textarea
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             maxLength={500}
//             required
//           />
//           <div className={styles.charCounter}>{description.length}/500</div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Details *</label>
//           <textarea
//             rows="4"
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             maxLength={500}
//             required
//           />
//           <div className={styles.charCounter}>{details.length}/500</div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Upload Images ({images.length}/10)</label>
//           <div className={styles.uploadSection}>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               disabled={images.length >= 10}
//             />
//             {images.length > 0 && (
//               <button
//                 type="button"
//                 onClick={clearAllImages}
//                 className={styles.clearBtn}
//               >
//                 Clear All
//               </button>
//             )}
//           </div>

//           {previews.length > 0 && (
//             <div className={styles.previewGrid}>
//               {previews.map((src, index) => (
//                 <div key={index} className={styles.previewBox}>
//                   <img src={src} alt={`preview-${index}`} className={styles.preview} />
//                   <button
//                     type="button"
//                     className={styles.removeBtn}
//                     onClick={() => removeImage(index)}
//                   >
//                     ✖
//                   </button>
//                   <div className={styles.imageInfo}>
//                     {images[index]?.name?.substring(0, 15)}...
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {submitStatus && (
//           <div className={`${styles.formStatus} ${styles[submitStatus.type]}`}>
//             {submitStatus.message}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={styles.submitButton}
//         >
//           {isSubmitting ? "Adding Event..." : "Add Event"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddEvent;

import React, { useState, useEffect } from "react";
import styles from "./AddEvent.module.css";

// APIs
import {
  createEvent,
  uploadEventImages,
  updateEvent as updateEventAPI
} from "../../api/flowApi";

function AddEvent({ updateEvent, setUpdateEvent, edit, setEdit }) {
  // ---------------- FORM STATES ----------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");

  // ---------------- IMAGE STATES ----------------
  const [existingImages, setExistingImages] = useState([]); // backend URLs
  const [newImages, setNewImages] = useState([]);           // File objects
  const [previews, setPreviews] = useState([]);             // UI previews

  // ---------------- UI STATES ----------------
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ---------------- PREFILL ON EDIT ----------------
  useEffect(() => {
    if (edit && updateEvent) {
      setTitle(updateEvent.title || "");
      setDescription(updateEvent.description || "");
      setDetails(updateEvent.details?.[0] || "");
      setDate(updateEvent.date?.split("T")[0] || "");
      setExistingImages(updateEvent.images || []);
      setNewImages([]);
    }
  }, [edit, updateEvent]);

  // ---------------- PREVIEW SYNC ----------------
  useEffect(() => {
    // revoke old blob URLs
    previews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviews([...existingImages, ...newImageUrls]);

    return () => {
      newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [existingImages, newImages]);

  // ---------------- HELPERS ----------------
  const formatDateDisplay = () => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDetails("");
    setDate("");
    setExistingImages([]);
    setNewImages([]);
    setPreviews([]);
  };

  // ---------------- IMAGE HANDLERS ----------------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...newImages, ...files].slice(0, 10 - existingImages.length);
    setNewImages(combined);
  };

  const removeImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let uploadedUrls = [];

      if (newImages.length > 0) {
        const uploadRes = await uploadEventImages(newImages);
        uploadedUrls = uploadRes.urls || uploadRes.data?.urls || [];
      }

      const payload = {
        title,
        description,
        date,
        details: [details],
        images: [...existingImages, ...uploadedUrls],
      };

      if (edit) {
        await updateEventAPI(updateEvent.id, payload);
        setSubmitStatus({ type: "success", message: "Event updated successfully!" });
        setEdit(false);
        setUpdateEvent(null);
      } else {
        await createEvent(payload);
        setSubmitStatus({ type: "success", message: "Event created successfully!" });
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type: "error", message: "Operation failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // ---------------- JSX ----------------
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {edit ? "Update Event" : "Add New Event"}
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label>Event Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
          <div className={styles.charCounter}>{title.length}/100</div>
        </div>

        {/* Date */}
        <div className={styles.formGroup}>
          <label>Event Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            required
          />
          <div className={styles.selectedDate}>{formatDateDisplay()}</div>
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label>Description *</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            required
          />
        </div>

        {/* Details */}
        <div className={styles.formGroup}>
          <label>Details *</label>
          <textarea
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={500}
            required
          />
        </div>

        {/* Images */}
        <div className={styles.formGroup}>
          <label>Upload Images ({previews.length}/10)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            disabled={previews.length >= 10}
          />

          {previews.length > 0 && (
            <div className={styles.previewGrid}>
              {previews.map((src, index) => (
                <div key={index} className={styles.previewBox}>
                  <img src={src} alt="preview" className={styles.preview} />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeImage(index)}
                  >
                    ✖
                  </button>
                  <div className={styles.imageInfo}>
                    {index < existingImages.length
                      ? "Existing image"
                      : newImages[index - existingImages.length]?.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        {submitStatus && (
          <div className={styles[submitStatus.type]}>
            {submitStatus.message}
          </div>
        )}

        {/* Actions */}
        <div className={styles.actionButtons}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (edit ? "Updating..." : "Adding...") : edit ? "Update Event" : "Add Event"}
          </button>
          {edit && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                setEdit(false);
                setUpdateEvent(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
