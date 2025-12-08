package com.example.demo.dto.review_portfolio;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InvestmentRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Investment range is required")
    private String investmentRange;
}
