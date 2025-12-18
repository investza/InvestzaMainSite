import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// Lazy loaded pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddEvent = lazy(() => import("./pages/AddEvent"));
const EventList = lazy(() => import("./pages/EventList"));
const CallBooking = lazy(() => import("./pages/CallBooking"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const ReviewPortfolio = lazy(() => import("./pages/ReviewPortfolio"));
const Users = lazy(() => import("./pages/Users"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const EventParticipants = lazy(() => import("./pages/EventParticipants"));
const Availability = lazy(() => import("./pages/Availability"));

const AuthGuard = lazy(() => import("./utils/AuthGuard"));

function AdminApp() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route element={<AuthGuard />}>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="event-list" element={<EventList />} />
          <Route path="call-booking" element={<CallBooking />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="review-portfolio" element={<ReviewPortfolio />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="event-participants" element={<EventParticipants />} />
          <Route path="users" element={<Users />} />
          <Route path="availability" element={<Availability />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminApp;
