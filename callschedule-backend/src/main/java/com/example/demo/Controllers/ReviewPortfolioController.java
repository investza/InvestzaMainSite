package com.example.demo.Controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Models.ReviewPortfolio;
import com.example.demo.Services.ReviewPortfolioService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.review_portfolio.InvestmentRequest;
import com.example.demo.dto.review_portfolio.ReviewPortfolioRequest;
import com.example.demo.dto.review_portfolio.SendOtpRequest;
import com.example.demo.dto.review_portfolio.StartRequest;
import com.example.demo.dto.review_portfolio.VerifyOtpRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/review_portfolio")
@CrossOrigin(origins = "*")
public class ReviewPortfolioController {
    
    @Autowired
    private ReviewPortfolioService service;

    // STEP - 1
    @PostMapping("/start")
    public ResponseEntity<?> start(@RequestBody StartRequest req){
        return service.start(req);
    }


    // STEP - 2
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest req){
        return service.sendOtp(req);
    }

    // STEP - 3
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest req){
        return service.verifyOtp(req);
    }

    // STEP - 3
    @PostMapping("/investment")
    public ResponseEntity<?> investment(@RequestBody InvestmentRequest req){
        return service.investment(req);
    }

    // STEP - 4
    @GetMapping("/check-slot")
    public ResponseEntity<?> getSlots(@RequestParam String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return service.getAvailableSlots(parsedDate);
    }

    // STEP 5
    @PostMapping("/submit")
    public ResponseEntity<?> submitRequest(@RequestBody ReviewPortfolioRequest req) {
        return service.submitRequest(req);
    }

    
    // Get all review portfolio requests
    @GetMapping("/list")
    public ResponseEntity<?> getAllReviewPortfolios() {
        try {
            List<ReviewPortfolio> data = service.getAll();

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(data);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    
    // Get single review portfolio request by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable String id) {
        try {
            ReviewPortfolio request = service.getRequestById(id);
            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to fetch request: " + e.getMessage()));
        }
    }
    
    // Update only status
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateStatus(
            @PathVariable String id,
            @RequestParam String status) {
        try {
            if (!status.equals("PENDING") && !status.equals("DONE")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(false, "Status must be either PENDING or DONE"));
            }
            
            service.updateStatus(id, status);
            return ResponseEntity.ok(new ApiResponse(true, "Status updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update status: " + e.getMessage()));
        }
    }
    
    // Delete review portfolio request
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRequest(@PathVariable String id) {
        try {
            service.deleteRequest(id);
            return ResponseEntity.ok(new ApiResponse(true, "Request deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete request: " + e.getMessage()));
        }
    }
    
    // Get count by status
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        try {
            return ResponseEntity.ok(service.getStats());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to fetch stats: " + e.getMessage()));
        }
    }
}