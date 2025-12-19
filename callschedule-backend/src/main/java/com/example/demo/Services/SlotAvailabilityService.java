package com.example.demo.Services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.Repositories.*;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.UnavailabilityTimeSlotsRequest;
import com.example.demo.Models.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class SlotAvailabilityService {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private CallHandlerAvailabilityRepository availabilityRepo;

    @Autowired
    private BookingRepository bookingRepo;

    // Time slots
    private final List<String> TIME_SLOTS = Arrays.asList(
        "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00"
    );

    public ResponseEntity<?> getAvailableSlots(LocalDate date) {

        long totalHandlers = adminRepo.countByRole("CALL_HANDLER");

        List<CallHandlerAvailability> handlerUnavailableList = availabilityRepo.findByDate(date);

        List<Map<String, Object>> slotDataList = new ArrayList<>();

        for (String slot : TIME_SLOTS) {

            long unavailableHandlers = handlerUnavailableList.stream()
                    .filter(h -> h.getUnavailableSlots().contains(slot))
                    .count();

            long bookedUsers = bookingRepo.countByDateAndTime(date, LocalTime.parse(slot));

            long available = totalHandlers - unavailableHandlers - bookedUsers;

            if (available < 0) available = 0;

            Map<String, Object> slotMap = new HashMap<>();
            slotMap.put("time", slot);
            slotMap.put("available", available);

            slotDataList.add(slotMap);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("date", date.toString());
        response.put("totalHandlers", totalHandlers);
        response.put("slots", slotDataList);

        return ResponseEntity.ok(response);
    }

    
    public ResponseEntity<?> storeUnavailableSlots(UnavailabilityTimeSlotsRequest req) {
        try {

            // Convert date (String → LocalDate)
            LocalDate parsedDate = LocalDate.parse(req.getDate());

            // Check if entry already exists for handler + date
            CallHandlerAvailability existing =
                    availabilityRepo.findByHandlerIdAndDate(req.getAdminId(), parsedDate);

            if (existing != null) {
                // Append new unavailable slots → but avoid duplicates
                Set<String> updatedSlots = new HashSet<>(existing.getUnavailableSlots());
                updatedSlots.addAll(req.getTimeSlots());

                existing.setUnavailableSlots(new ArrayList<>(updatedSlots));
                availabilityRepo.save(existing);

                return ResponseEntity.ok(
                        new ApiResponse(true, "Unavailable slots updated")
                );
            }
            // ELSE → create new entry
            CallHandlerAvailability newEntry = CallHandlerAvailability.builder()
                    .handlerId(req.getAdminId())
                    .date(parsedDate)
                    .unavailableSlots(req.getTimeSlots())
                    .build();   

            availabilityRepo.save(newEntry);

            return ResponseEntity.ok(
                    new ApiResponse(true, "Unavailable slots saved")
            );

        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    public ResponseEntity<?> getUnavailabilities(String date, String id) {
        try {
            LocalDate parsedDate = LocalDate.parse(date);

            CallHandlerAvailability existing =
                    availabilityRepo.findByHandlerIdAndDate(id, parsedDate);

            if (existing == null) {
                return ResponseEntity.ok(
                        new ApiResponse(false, "No unavailabilities found")
                );
            }
            return ResponseEntity.ok(existing);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Invalid date format"));
        }
    }

}
