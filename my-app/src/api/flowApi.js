import axios from "axios";

const API = "http://localhost:8080/api";
// const API = "/api";   -> for production

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
  axios.get(`${API}/flow/bookings`);


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









// ------------------------------------------------------------------ADMIN---------------------------------------------------------------------------------------

// ----------------CONTACT-----------------------
export const adminGetAllContacts = () => axios.get(`${API}/contact/all`);

export const adminDeleteContact = (id) => axios.delete(`${API}/contact/delete/${id}`);

export const adminUpdateContactStatus = (id, status) => axios.patch(`${API}/contact/${id}/status`, { params: { status }, });

export const adminGetContactStats = () => axios.get(`${API}/contact/stats`);


// -------------------EVENT-------------------------
export const createEvent = (payload) => axios.post(`${API}/events/create`, payload); // payload = title, description, images, date, details

export const uploadEventImages = (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return axios.post(`${API}/events/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getEventById = (id) => axios.get(`${API}/events/event/${id}`);

export const deleteEvent = (id) => axios.delete(`${API}/events/delete/${id}`);

export const updateEvent = (id, payload) => axios.put(`${API}/events/update/${id}`, payload); // payload = title, description, images, date, details

export const countEvents = () => axios.get(`${API}/events/count`);


// -----------------REVIEW PORTFOLIO ADMIN-----------------

export const getAllReviewPortfolios = () => axios.get(`${API}/review_portfolio/list`);

export const getReviewPortfolioById = (id) => axios.get(`${API}/review_portfolio/${id}`);

export const updateReviewPortfolioStatus = (id, status) => axios.patch(`${API}/review_portfolio/${id}/status`, { params: { status }, });

export const deleteReviewPortfolio = (id) => axios.delete(`${API}/review_portfolio/${id}`);

export const getReviewPortfolioStats = () => axios.get(`${API}/review_portfolio/stats`);


// 





