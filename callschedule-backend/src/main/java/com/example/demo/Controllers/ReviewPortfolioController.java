package com.example.demo.Controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.ReviewPortfolioService;
import com.example.demo.dto.ReviewPortfolioRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/review_portfolio")
@CrossOrigin(origins = "*")
public class ReviewPortfolioController {
    
    @Autowired
    private ReviewPortfolioService service;
    
    @PostMapping("/submit")
    public ResponseEntity<?> submitForm(@Valid @RequestBody ReviewPortfolioRequest request) {
        try {
            service.saveForm(request);
            return ResponseEntity.ok(Map.of("message", "Form submitted successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", e.getMessage()));  // ADD .body() here
        }
    }
    // @PostMapping("/save")
    // public ResponseEntity<?> saveForm(@Valid @RequestBody ReviewPortfolioForm req){
    //     try{
    //         service.saveRequestPortfolio(req);
    //         return ResponseEntity.ok(Map.of("message", "Form submitted successfully"));
    //     } catch (Exception e) {
    //         return ResponseEntity.internalServerError()
    //                 .body(Map.of("message", e.getMessage()));  // ADD .body() here
    //     }
    // }
    
    
}