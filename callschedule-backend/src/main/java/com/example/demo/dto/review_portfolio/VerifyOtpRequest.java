package com.example.demo.dto.review_portfolio;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyOtpRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "OTP is required")
    private String otp;
}

