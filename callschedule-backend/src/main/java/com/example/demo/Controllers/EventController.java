package com.example.demo.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.Services.EventService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.CreateEventRequest;

import jakarta.websocket.server.PathParam;

import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/api/events")
@CrossOrigin("*")
public class EventController {

    @Autowired
    private EventService service;
    
    @PostMapping("/create")
    public ApiResponse createEvent(@RequestBody CreateEventRequest req) {
        return service.createEvent(req);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImages(@RequestParam("files") MultipartFile[] files) {
        List<String> urls = service.upload(files);
        return ResponseEntity.ok(Map.of("urls", urls));
    }

    
    @GetMapping("/list")
    public ResponseEntity<?> getAllEvents(){
        return service.getAllEvents();
    }

    @GetMapping("/event/{id}")
    public ResponseEntity<?> getEvent(@PathVariable String id) {
        return service.getEventById(id);
    }

}
