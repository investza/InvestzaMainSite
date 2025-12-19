import axios from "axios";
import axiosPrivate from "./axiosPrivate";


const API = "http://localhost:8080/api";
// const API = "/api";  // -> for production

// --------------------Call Scheduling----------------------------------------
export const startFlow = (fullName) => axios.post(`${API}/flow/start`, { fullName });

export const sendOtp = (userId, mobile) => {
  return axios.post(`${API}/flow/send-otp`, { userId, mobile });
};

export const verifyOtp = (userId, otp) =>
  axios.post(`${API}/flow/verify-otp`, { userId: String(userId), otp });

export const selectInvestment = (userId, investmentRange) =>
  axios.post(`${API}/flow/investment`, { userId, investmentRange });

export const checkSlot = (date) =>
  axios.get(`${API}/flow/check-slot`, { params: { date } }); // Updated

export const createBooking = (payload) =>
  axios.post(`${API}/flow/create-booking`, payload);

export const getBookings = () =>
  axiosPrivate.get(`${API}/flow/bookings`);


// ------------------- Contact Us ---------------------------------------
export const sendContactMessage = (payload) => {
  return axios.post(`${API}/contact/receive`, payload);
};


// ------------------ Fetch Events ------------------------------------
export const getEvents = (payload) => { return axios.get(`${API}/events/list`, payload); }


// ------------------Review My Portfolio flow--------------------------
export const startReviewPortfolio = (fullName) => axios.post(`${API}/review_portfolio/start`, { fullName });

export const sendOtp_reviewPortfolio = (userId, contactNumber) => axios.post(`${API}/review_portfolio/send-otp`, { userId, contactNumber });

export const verifyOtp_reviewPortfolio = (userId, otp) => axios.post(`${API}/review_portfolio/verify-otp`, { userId, otp });

export const setInvestment = (userId, investmentRange) => axios.post(`${API}/review_portfolio/investment`, { userId, investmentRange });

export const checkSlot_reviewPortfolio = (date) => axios.get(`${API}/review_portfolio/check-slot`, { params: { date } });

export const submit_reviewPortfolio = (payload) => axios.post(`${API}/review_portfolio/submit`,  payload ); // payload - userId, email, guestEmail, message, date, time



// ------------------------------------------------------------------ ADMIN ------------------------------------------------------------------

// ---------------- CONTACT ----------------
export const adminGetAllContacts = () =>
  axiosPrivate.get("/contact/all");

export const adminDeleteContact = (id) =>
  axiosPrivate.delete(`/contact/delete/${id}`);

export const adminUpdateContactStatus = (id, status) =>
  axiosPrivate.patch(`/contact/${id}/status`, null, {
    params: { status },
  });

export const adminGetContactStats = () =>
  axiosPrivate.get("/contact/stats");


// ---------------- EVENT ----------------
export const createEvent = (payload) =>
  axiosPrivate.post("/events/create", payload);

export const uploadEventImages = (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return axiosPrivate.post("/events/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getEventById = (id) =>
  axiosPrivate.get(`/events/event/${id}`);

export const deleteEvent = (id) =>
  axiosPrivate.delete(`/events/delete/${id}`);

export const updateEvent = (id, payload) =>
  axiosPrivate.put(`/events/update/${id}`, payload);

export const countEvents = () =>
  axiosPrivate.get("/events/count");


// ---------------- REVIEW PORTFOLIO ----------------
export const getAllReviewPortfolios = () =>
  axiosPrivate.get("/review_portfolio/list");

export const getReviewPortfolioById = (id) =>
  axiosPrivate.get(`/review_portfolio/${id}`);

export const updateReviewPortfolioStatus = (id, status) =>
  axiosPrivate.patch(`/review_portfolio/${id}/status`, null, {
    params: { status },
  });

export const deleteReviewPortfolio = (id) =>
  axiosPrivate.delete(`/review_portfolio/${id}`);

export const getReviewPortfolioStats = () =>
  axiosPrivate.get("/review_portfolio/stats");

export const updateReviewPortfolio = (id, payload) =>
  axiosPrivate.patch(`/review_portfolio/update/${id}`, payload);


// ---------------- AUTH / ADMIN ----------------
export const adminLogin = (payload) => {
  // payload = { adminName, password }
  return axios.post(`${API}/auth/login`, payload);
}; //(done)
export const getAllAdmins = () =>
  axiosPrivate.get("/auth/admin/list");

export const deleteAdmin = (id) =>
  axiosPrivate.delete(`/auth/delete/${id}`);

export const changeAdminRole = (payload) =>
  axiosPrivate.post("/auth/change-role", payload);

export const countAdmin = () =>
  axiosPrivate.get("/auth/count");


// ---------------- CALL SCHEDULING ----------------
export const updateCallStatus = (id, status) =>
  axiosPrivate.patch(`/flow/${id}/update-status`, null, {
    params: { status },
  });

export const adminDeleteScheduledCall = (id) =>
  axiosPrivate.delete(`/flow/delete/${id}`);

export const adminGetCallStats = () =>
  axiosPrivate.get("/flow/call/stats");

export const adminSaveUnavailabilitySlots = (payload) =>
  axiosPrivate.post("/flow/save-unavailability", payload);

export const updateCallBooking = (id, payload) =>
  axiosPrivate.patch(`/flow/update-booking/${id}`, payload);








// // ------------------------------------------------------------------ADMIN---------------------------------------------------------------------------------------

// // ----------------CONTACT----------------------- [DONE]
// export const adminGetAllContacts = () => axios.get(`${API}/contact/all`); //contact list (done)

// export const adminDeleteContact = (id) => axios.delete(`${API}/contact/delete/${id}`); //deleting the contact (done)

// export const adminUpdateContactStatus = (id, status) => axios.patch(`${API}/contact/${id}/status`,null, { params: { status }, }); //(done)

// export const adminGetContactStats = () => axios.get(`${API}/contact/stats`); //contact message stats  (done)


// // -------------------EVENT------------------------- [DONE]
// export const createEvent = (payload) => axios.post(`${API}/events/create`, payload); // payload = title, description, images,  date, details //(done)

// export const uploadEventImages = (files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));
//     return axios.post(`${API}/events/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
// }; //(done)

// export const getEventById = (id) => axios.get(`${API}/events/event/${id}`); //(not needed)

// export const deleteEvent = (id) => axios.delete(`${API}/events/delete/${id}`); //(done)

// export const updateEvent = (id, payload) => axios.put(`${API}/events/update/${id}`, payload); // payload = title, description, images, date, details (done)

// export const countEvents = () => axios.get(`${API}/events/count`); //events counting and stats (done)


// // -----------------REVIEW PORTFOLIO ADMIN----------------- [DONE]

// export const getAllReviewPortfolios = () => axios.get(`${API}/review_portfolio/list`); //(done)

// export const getReviewPortfolioById = (id) => axios.get(`${API}/review_portfolio/${id}`); //(not needed)

// export const updateReviewPortfolioStatus = (id, status) => axios.patch(`${API}/review_portfolio/${id}/status`,null, { params: { status }, }); //(done)

// export const deleteReviewPortfolio = (id) => axios.delete(`${API}/review_portfolio/${id}`); //(done)

// export const getReviewPortfolioStats = () => axios.get(`${API}/review_portfolio/stats`); //portfolio stats count (done)

// // { fullName, mobile, email, guestEmail, message, investmentRange, date, time }
// export const updateReviewPortfolio = (id, payload) => axios.patch(`${API}/review_portfolio/update/${id}`, payload); //(done)

// Save unavailable slots for Portfolio Reviewer
export const savePortfolioUnavailabilitySlots = (payload) =>
  axiosPrivate.post("/review_portfolio/save-unavailability", payload);


// Get unavailable slots for Portfolio Reviewer
export const getPortfolioUnavailabilities = (date, adminId) =>
  axiosPrivate.get("/review_portfolio/unavailabilities", {
    params: {
      date,
      id: adminId,
    },
  });


// // ------------------ LOGIN / AUTH APIS ----------------------------------

// export const adminLogin = (payload) => {
//   // payload = { adminName, password }
//   return axios.post(`${API}/auth/login`, payload);
// }; //(done)

// export const addAdmin = (payload) => {
//   // payload = { adminName, email, password }
//   return axios.post(`${API}/auth/add-admin`, payload);
// }; //(not integrated)

// export const getAllAdmins = () => {
//   return axios.get(`${API}/auth/admin/list`);
// }; //(not integrated)

// export const deleteAdmin = (id) => {
//   return axios.delete(`${API}/auth/delete/${id}`);
// }; //(not integrated)

// export const changeAdminRole = (payload) => {
//   // payload = { adminId, role }
//   return axios.post(`${API}/auth/change-role`, payload);
// }; //(not integrated)

// export const countAdmin = () => axios.get(`${API}/auth/count`); //(done)



// // ---------------------------Call Scheduling------------------------------

// export const updateCallStatus = (id, status) => axios.patch(`${API}/flow/${id}/update-status`,null, { params: { status }, }); //(done)

// export const adminDeleteScheduledCall = (id) => axios.delete(`${API}/flow/delete/${id}`); //(done)

// export const adminGetCallStats = () => axios.get(`${API}/flow/call/stats`); //(done)

// // payload = { adminId, date, timeSlots }
// export const adminSaveUnavailabilitySlots = (payload) => axios.post(`${API}/flow/save-unavailability`, payload);   

// // { fullName, mobile, email, guestEmail, message, investmentRange, date, time }
// export const updateCallBooking = (id, payload) => axios.patch(`${API}/flow/update-booking/${id}`, payload); //(done)

// Get unavailable slots for Call Handler
export const getCallHandlerUnavailabilities = (date, adminId) =>
  axiosPrivate.get("/flow/unavailabilities", {
    params: {
      date,
      id: adminId,
    },
  });



