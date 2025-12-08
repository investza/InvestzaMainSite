package com.example.demo.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.demo.Models.ReviewPortfolio;
import com.example.demo.dto.review_portfolio.VerifyOtpRequest;
import com.example.demo.dto.review_portfolio.StartRequest;
import com.example.demo.dto.review_portfolio.SendOtpRequest;
import com.example.demo.dto.review_portfolio.InvestmentRequest;
import com.example.demo.dto.review_portfolio.ReviewPortfolioRequest;

public interface ReviewPortfolioService {

    public ResponseEntity<?> start(StartRequest req);
    public ResponseEntity<?> sendOtp(SendOtpRequest req);
    public ResponseEntity<?> verifyOtp(VerifyOtpRequest req);
    public ResponseEntity<?> investment(InvestmentRequest req);
    public ResponseEntity<?> getAvailableSlots(LocalDate date);
    public ResponseEntity<?> submitRequest(ReviewPortfolioRequest req);

    // For Admin Dashboard
    public List<ReviewPortfolio> getAll();
    public ReviewPortfolio getRequestById(String id);
    public ReviewPortfolio updateStatus(String id, String status);
     public void deleteRequest(String id);
     public Map<String, Object> getStats(); 
}
