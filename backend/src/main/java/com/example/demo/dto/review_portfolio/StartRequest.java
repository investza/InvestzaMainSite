package com.example.demo.dto.review_portfolio;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StartRequest {
    
    @NotBlank(message = "Name is required")
    private String fullName;
}
