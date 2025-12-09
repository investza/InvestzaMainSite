package com.example.demo.Services;

public interface SmsService {
    // Reverted to original signature
    String sendCallSchedulingSms(String mobile, String otp);
    String sendReviewPortfolioSms(String mobile, String otp);
}