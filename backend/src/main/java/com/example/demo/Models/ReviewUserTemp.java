package com.example.demo.Models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "review_user_temp")
public class ReviewUserTemp {

    @Id
    private String id;

    private String fullName;

    @Indexed(unique = false)
    private String mobile;

    private String otp;
    private LocalDateTime otpGeneratedAt;
    private boolean otpVerified;

    private String investmentRange;

    private LocalDateTime createdAt;
}
