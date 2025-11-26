package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.ContactService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ContactMessageRequest;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // Contact Message from user will be receive 
    @PostMapping("/receive")
    public ResponseEntity<ApiResponse> receiveMessage(
            @Valid @RequestBody ContactMessageRequest request) {

        try{
            contactService.processForm(request);
            return ResponseEntity.ok(new ApiResponse(true, "Message saved & Email sent successfully"));
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage()));
        }
    }
}
