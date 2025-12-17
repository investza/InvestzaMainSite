package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class UpdateBookingRequest {

    private String fullName;
    private String mobile;
    private String email;
    private String guestEmail;
    private String message;
    private String investmentRange;
    private LocalDate date;
    private LocalTime time;
}
