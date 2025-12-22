import axios from "axios";
import axiosPrivate from "./axiosPrivate";


// const API = "http://localhost:8080/api";
const API = "/api";  // -> for production

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
  axiosPrivate.get("/auth/admin/list"); //(done)

export const deleteAdmin = (id) =>
  axiosPrivate.delete(`/auth/delete/${id}`); //(done)

export const changeAdminRole = (payload) =>
  axiosPrivate.post("/auth/change-role", payload); //(where to integrate) iinstead of this i think we can give a functionality to update the username,password,role it will be 

export const countAdmin = () =>
  axiosPrivate.get("/auth/count"); //(done)


// ---------------- CALL SCHEDULING ----------------
export const updateCallStatus = (id, status) =>
  axiosPrivate.patch(`/flow/${id}/update-status`, null, {
    params: { status },
  });

export const adminDeleteScheduledCall = (id) =>
  axiosPrivate.delete(`/flow/delete/${id}`);

export const adminGetCallStats = () =>
  axiosPrivate.get("/flow/call/stats");

export const saveCallHandlerUnavailabilitySlots = (payload) =>
  axiosPrivate.post("/flow/save-unavailability", payload);

export const updateCallBooking = (id, payload) =>
  axiosPrivate.patch(`/flow/update-booking/${id}`, payload);

export const addAdmin = (payload) => {
  // payload = { adminName, email, password,role}
  return axiosPrivate.post(`${API}/auth/add-admin`, payload);
}; //(not integrated)










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


export const getCallHandlerUnavailabilities = (date, adminId) =>
  axiosPrivate.get("/flow/unavailabilities", {
    params: {
      date,
      id: adminId,
    },
  });



