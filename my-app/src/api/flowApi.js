import axios from "axios";

const API = "http://localhost:8080/api";

// Call Scheduling
export const startFlow = (fullName) => axios.post(`${API}/flow/start`, { fullName });

export const sendOtp = (userId, mobile) => {
  console.log("BODY SENDING:", { userId, mobile });

  return axios.post(`${API}/flow/send-otp`, { userId, mobile });
};

export const verifyOtp = (userId, otp) =>
  axios.post(`${API}/flow/verify-otp`, { userId: String(userId), otp });

export const selectInvestment = (userId, investmentRange) =>
  axios.post(`${API}/flow/investment`, { userId, investmentRange });


// export const checkSlot = (date, time) =>
//   axios.get(`${API}/flow/check-slot`, { params: { date, time } });

export const checkSlot = (date) =>
  axios.get(`${API}/flow/check-slot`, { params: { date } }); // Updated

export const createBooking = (payload) =>
  axios.post(`${API}/flow/create-booking`, payload);

export const getBookings = () =>
  axios.get(`${API}/flow/bookings`);

// Contact Us
export const sendContactMessage = (payload) => {
  return axios.post(`${API}/contact/receive`, payload);
};


// export const ReviewPortfolioSubmit = (fullName, contactNumber, investmentValue, 
//   email, agreeToPolicy, recaptchaToken) => 
//     axios.post(`${API}/review_portfolio/submit`, 
//       { fullName, contactNumber, investmentValue, email, agreeToPolicy, recaptchaToken });

// Fetch Events 
export const getEvents = (payload) => {
  return axios.get(`${API}/events/list`, payload);
}

// Review My Portfolio flow
export const startReviewPortfolio = (fullName) => axios.post(`${API}/review_portfolio/start`, { fullName });

export const sendOtp_reviewPortfolio = (userId, contactNumber) => axios.post(`${API}/review_portfolio/send-otp`, { userId, contactNumber });

export const verifyOtp_reviewPortfolio = (userId, otp) => axios.post(`${API}/review_portfolio/verify-otp`, { userId, otp });

export const setInvestment = (userId, investmentRange) => axios.post(`${API}/review_portfolio/investment`, { userId, investmentRange });

export const checkSlot_reviewPortfolio = (date) => axios.get(`${API}/review_portfolio/check-slot`, { params: { date } });

export const submit_reviewPortfolio = (payload) => axios.post(`${API}/review_portfolio/submit`, { payload }); // payload - userId, email, guestEmail, message, date, time

