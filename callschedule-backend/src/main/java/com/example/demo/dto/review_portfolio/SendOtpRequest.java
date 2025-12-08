package com.example.demo.dto.review_portfolio;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendOtpRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;
}
