package com.example.demo.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.CreateEventRequest;


public interface EventService {
    public ApiResponse createEvent(CreateEventRequest req);
    public ResponseEntity<?> getAllEvents();
    public ResponseEntity<?> getEventById(String id);
    public List<String> upload(MultipartFile[] files);
    public ApiResponse deleteEvent(String id);
    public ApiResponse updateEvent(String id, CreateEventRequest req);
}
