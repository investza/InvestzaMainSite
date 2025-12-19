package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // ---------- USER SEND MESSAGE ----------
    @PostMapping("/receive")
    public ResponseEntity<ApiResponse> receiveMessage(
            @Valid @RequestBody ContactMessageRequest request) {

        try {
            contactService.processForm(request);
            return ResponseEntity.ok(new ApiResponse(true, "Message saved & email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    // ---------- ADMIN: GET ALL ----------
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return contactService.getAllMessages();
    }

    // ---------- ADMIN: DELETE ----------
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable String id) {
        return contactService.deleteMessage(id);
    }


    // ---------- ADMIN: UPDATE ----------
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable String id,
            @RequestBody ContactMessageRequest dto) {

        return contactService.updateMessage(id, dto);
    }

    // ----------- ADMIN: GET STATS----------
    @GetMapping("/stats")
    public ResponseEntity<?> getStats(){
        return contactService.getStats();
    }

    // --------ADMIN: Update Status------------
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        try {
            String cleanedStatus = status.trim().toUpperCase();

            if (!cleanedStatus.equals("PENDING") && !cleanedStatus.equals("DONE")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(false, "Status must be either PENDING or DONE"));
            }

            contactService.updateStatus(id, cleanedStatus);

            return ResponseEntity.ok(
                    new ApiResponse(true, "Status updated successfully")
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update status: " + e.getMessage()));
        }
    }


}
