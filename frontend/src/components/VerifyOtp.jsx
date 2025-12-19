import React, { useState, useEffect } from "react";
import styles from "./VerifyOtp.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { verifyOtp } from "../api/flowApi";
import { verifyOtp_reviewPortfolio } from "../api/flowApi";

import { sendOtp } from "../api/flowApi";
import { sendOtp_reviewPortfolio } from "../api/flowApi";

import { userDataContext } from "./contexts/userDataContext";

const VerifyOtp = ({ onVerify }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(26);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userData, setUserData } = useContext(userDataContext);
  // const { isOTPVerified, setIsOTPVerified } = useContext(OtpVerification);

  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length === 4) {
      try {
        let res;
        if (userData.category === "portfolioReview") {
          res = await verifyOtp_reviewPortfolio(userData.userId, otp);

          if (res.status === 200) {
            setIsLoading(true);
            setTimeout(() => {
              navigate("/investmentDetails", { replace: true });
            }, 1000);
          } else {
            alert("Wrong OTP");
          }
        } else {
          res = await verifyOtp(userData.userId, otp);

          if (res.data.verified) {
            setIsLoading(true);

            setTimeout(() => {
              setIsLoading(false);
              navigate("/investmentDetails", { replace: true });
            }, 1000);
          } else {
            alert("Wrong OTP");
          }
        }
      } catch (error) {
        alert("Error verifying OTP");
        console.error(error);
      }
    }
  };

  const handleResend = async () => {
    try {
      let res;
      if (userData.category === "callScheduling") {
        res = await sendOtp(userData.userId, userData.userPhone);
        setUserData((prevUserData) => ({
          ...prevUserData,
          otp: res.data.otp,
        }));
      } else {
        res = await sendOtp_reviewPortfolio(
          userData.userId,
          userData.userPhone
        );
        setUserData((prevUserData) => ({
          ...prevUserData,
          otp: res.data.otp,
        }));
      }

      setOtp("");
      setTimer(26);
      setCanResend(false);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className={styles["otp-container"]}>
      <div className={styles["otp-card"]}>
        {/* Header */}
        <div className={styles["otp-header"]}>
          <h1 className={styles["otp-title"]}>Verify OTP</h1>
          <p className={styles["otp-description"]}>Enter the 4-digit OTP</p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className={styles["otp-form"]}>
          <div className={styles["otp-input-group"]}>
            <input
              type="text"
              inputMode="numeric"
              maxLength="4"
              placeholder="Enter 4 digit OTP"
              value={otp}
              onChange={handleOtpChange}
              className={styles["otp-input"]}
              required
            />
          </div>

          {/* Consent */}
          <p className={styles["otp-consent"]}>
            By proceeding, you give consent to receive communication on WhatsApp
            and agree to our{" "}
            <a href="#terms" className={styles["otp-link"]}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#privacy" className={styles["otp-link"]}>
              Privacy Policy
            </a>
          </p>

          {/* Buttons */}
          <div className={styles["otp-buttons"]}>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`${styles["resend-btn"]} ${
                !canResend ? styles["disabled"] : ""
              }`}
            >
              Resend OTP {!canResend && `(${timer})`}
            </button>

            <button
              type="submit"
              disabled={otp.length !== 4 || isLoading}
              className={`${styles["verify-btn"]} ${
                isLoading ? styles["loading"] : ""
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
