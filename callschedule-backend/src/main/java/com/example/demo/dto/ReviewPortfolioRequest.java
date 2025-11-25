package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewPortfolioRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    private String contactNumber;

    @NotBlank
    private String investmentValue;

    @NotBlank
    @Email
    private String email;

    @NotNull
    private Boolean agreeToPolicy;
}
