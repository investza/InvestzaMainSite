package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class UnavailabilityTimeSlotsRequest {
    private String adminId;
    private String date;
    private List<String> timeSlots;
}
