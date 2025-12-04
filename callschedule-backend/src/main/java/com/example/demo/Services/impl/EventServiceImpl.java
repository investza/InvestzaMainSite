package com.example.demo.Services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.Models.Event;
import com.example.demo.Repositories.EventRepository;
import com.example.demo.Services.EventService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.CreateEventRequest;


@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private Cloudinary cloudinary;

    // ---------------------------
    // Create Event
    // ---------------------------
    @Override
    public ApiResponse createEvent(CreateEventRequest req) {
        try {
            LocalDate eventDate;
            try {
                eventDate = LocalDate.parse(req.getDate()); 
            } catch (DateTimeParseException e) {
                return new ApiResponse(false, "Invalid date format. Please use yyyy-MM-dd");
            }

            // Determine category based on event date
            String category = eventDate.isBefore(LocalDate.now()) ? "past" : "upcoming";

            Event event = Event.builder()
                    .images(req.getImages())
                    .date(req.getDate())   
                    .title(req.getTitle())
                    .description(req.getDescription())
                    .category(category)   
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            eventRepository.save(event);

            return new ApiResponse(true, "Event created successfully");
        } catch (Exception e) {
            return new ApiResponse(false, e.getMessage());
        }
    }


    // ---------------------------
    // get all events
    // ---------------------------
    @Override
    public ResponseEntity<?> getAllEvents() {
        try {
            return ResponseEntity.ok(eventRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ---------------------------
    // Get event by ID
    // ---------------------------
    @Override
    public ResponseEntity<?> getEventById(String id) {
        try {
            Optional<Event> optionalEvent = eventRepository.findById(id);
            if (optionalEvent.isPresent()) {
                return ResponseEntity.ok(optionalEvent.get());
            } else {
                return ResponseEntity.status(404)
                        .body(Map.of("message", "Event not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", e.getMessage()));
        }
    }


    public List<String> upload(MultipartFile[] files) {
        List<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.emptyMap());

                urls.add(uploadResult.get("secure_url").toString());

            } catch (Exception e) {
                throw new RuntimeException("Image upload failed: " + e.getMessage());
            }
        }

        return urls;
    }

}
