package com.example.demo.dto.review_portfolio;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReviewPortfolioRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Email is required")
    private String email;

    private String guestEmail;

    private String message;   

    private LocalDate date;
    private LocalTime time;

    
}
