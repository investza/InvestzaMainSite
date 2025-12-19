package com.example.demo.Services.impl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Models.Booking;
import com.example.demo.Models.CallHandlerAvailability;
import com.example.demo.Models.PortfolioReviewer;
import com.example.demo.Models.ReviewPortfolio;
import com.example.demo.Models.ReviewUserTemp;
import com.example.demo.Models.UserTemp;
import com.example.demo.Repositories.AdminRepository;
import com.example.demo.Repositories.PortfolioReviewerRepository;
import com.example.demo.Repositories.ReviewPortfolioRepository;
import com.example.demo.Repositories.ReviewUserTempRepository;
import com.example.demo.Services.ReviewPortfolioService;
import com.example.demo.Services.SmsService;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.UnavailabilityTimeSlotsRequest;
import com.example.demo.dto.UpdateBookingRequest;
import com.example.demo.dto.review_portfolio.InvestmentRequest;
import com.example.demo.dto.review_portfolio.ReviewPortfolioRequest;
import com.example.demo.dto.review_portfolio.StartRequest;
import com.example.demo.dto.review_portfolio.SendOtpRequest;
import com.example.demo.dto.review_portfolio.VerifyOtpRequest;
import com.example.demo.util.OtpUtil;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ReviewPortfolioServiceImpl implements ReviewPortfolioService {

    @Autowired
    private ReviewUserTempRepository reviewUserTempRepository;

    @Autowired
    private SmsService smsService;

    // Time slots
    private final List<String> TIME_SLOTS = Arrays.asList(
        "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00"
    );

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private PortfolioReviewerRepository availabilityRepo;

    @Autowired
    private ReviewPortfolioRepository reviewPortfolioRepository;

    // Email related beans / config
    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${investza.admin.email}")
    private String getNotificationMail;

    @Override
    public ResponseEntity<?> start(StartRequest req) {
        try {
            ReviewUserTemp u = ReviewUserTemp.builder()
                    .fullName(req.getFullName())
                    .otpVerified(false)
                    .createdAt(LocalDateTime.now())
                    .build();

            ReviewUserTemp savedUser = reviewUserTempRepository.save(u);

            return ResponseEntity.ok(Map.of("userId", savedUser.getId()));
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> sendOtp(SendOtpRequest req) {

        try {
            // Validate mobile number
            if (req.getContactNumber() == null || req.getContactNumber().isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Mobile number is required"));
            }

            ReviewUserTemp tempUser = null;

            // 1. If userId is provided → find user
            if (req.getUserId() != null && !req.getUserId().isBlank()) {
                tempUser = reviewUserTempRepository.findById(req.getUserId()).orElse(null);
            }

            // 2. If not found → search by mobile
            if (tempUser == null) {
                tempUser = reviewUserTempRepository.findByMobile(req.getContactNumber()).orElse(null);
            }

            // 3. If still not found → create a new temp user
            if (tempUser == null) {
                tempUser = ReviewUserTemp.builder()
                        .mobile(req.getContactNumber())
                        .otpVerified(false)
                        .createdAt(LocalDateTime.now())
                        .build();
            }

            // Generate OTP
            String otp = OtpUtil.generate4DigitOtp();

            tempUser.setMobile(req.getContactNumber());
            tempUser.setOtp(otp);
            tempUser.setOtpVerified(false);
            tempUser.setOtpGeneratedAt(LocalDateTime.now());

            reviewUserTempRepository.save(tempUser);

            // Send OTP using SMS service
            smsService.sendReviewPortfolioSms(tempUser.getMobile(), otp);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "OTP sent successfully - check SMS",
                            "userId", tempUser.getId(),
                            "mobile", tempUser.getMobile()
                    )
            );
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> verifyOtp(VerifyOtpRequest req) {

        try {
            // Validate userId
            if (req.getUserId() == null || req.getUserId().isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "User ID is required"));
            }

            // Validate OTP
            if (req.getOtp() == null || req.getOtp().isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "OTP is required"));
            }

            // Fetch user by ID
            Optional<ReviewUserTemp> optional = reviewUserTempRepository.findById(req.getUserId());
            if (optional.isEmpty()) {
                return ResponseEntity.status(404)
                        .body(Map.of("error", "User not found"));
            }

            ReviewUserTemp user = optional.get();

            // OTP not generated case
            if (user.getOtp() == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "OTP not generated yet"));
            }

            // OTP expiry check (3 minutes)
            if (user.getOtpGeneratedAt() != null &&
                    user.getOtpGeneratedAt().plusMinutes(3).isBefore(LocalDateTime.now())) {

                return ResponseEntity.status(410)
                        .body(Map.of("error", "OTP expired. Please request a new one"));
            }

            // Match OTP
            if (!user.getOtp().equals(req.getOtp().trim())) {
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Invalid OTP"));
            }

            // OTP matched → mark verified
            user.setOtpVerified(true);
            reviewUserTempRepository.save(user);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "OTP verified successfully",
                            "userId", user.getId()
                    )
            );
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> investment(InvestmentRequest req) {
        try {
            boolean result = setInvestment(req);   // calling your transactional method

            // Prepare success response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("eligible", result);
            response.put("message", "Investment range updated successfully");

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // User not found OR validation error
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        } catch (Exception e) {
            // Any other unexpected error
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Something went wrong: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Transactional
    public boolean setInvestment(InvestmentRequest req) {
        ReviewUserTemp u = reviewUserTempRepository.findById(req.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        u.setInvestmentRange(req.getInvestmentRange());
        reviewUserTempRepository.save(u);

        return !"BELOW_50L".equalsIgnoreCase(req.getInvestmentRange());
    }


    @Override
    public ResponseEntity<?> getAvailableSlots(LocalDate date) {

        long totalHandlers = adminRepo.countByRole("PORTFOLIO_HANDLER");

        List<PortfolioReviewer> handlerUnavailableList = availabilityRepo.findByDate(date);

        List<Map<String, Object>> slotDataList = new ArrayList<>();

        for (String slot : TIME_SLOTS) {

            long unavailableHandlers = handlerUnavailableList.stream()
                    .filter(h -> h.getUnavailableSlots().contains(slot))
                    .count();

            long bookedUsers = reviewPortfolioRepository.countByDateAndTime(date, LocalTime.parse(slot));

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

    @Override
    @Transactional
    public ResponseEntity<?> submitRequest(ReviewPortfolioRequest req) {
        try {
            // Validate user
            ReviewUserTemp user = reviewUserTempRepository.findById(req.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // OTP Verification check
            if (!user.isOtpVerified()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("success", false, "error", "OTP not verified"));
            }

            // Investment eligibility check
            if ("BELOW_50L".equalsIgnoreCase(user.getInvestmentRange())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("success", false, "error", "User not eligible for portfolio review"));
            }

            // ---- Save Review Request ----
            ReviewPortfolio booking = 
                    ReviewPortfolio.builder()
                    .id(user.getId())
                    .fullName(user.getFullName())
                    .contactNumber(user.getMobile())
                    .email(req.getEmail())
                    .guestEmail(req.getGuestEmail())
                    .message(req.getMessage())
                    .investmentRange(user.getInvestmentRange())
                    .date(req.getDate())
                    .time(req.getTime())
                    .status("PENDING")
                    .createdAt(LocalDateTime.now())
                    .build();

            ReviewPortfolio saved = reviewPortfolioRepository.save(booking);

            // ---- Optional: Send Email Notifications (same as your other code) ----
            try {
                sendMail(saved);
                notifySender(saved);
            } catch (Exception e) {
                System.err.println("Email sending failed: " + e.getMessage());
            }

            // ---- Success Response ----
            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Portfolio review request submitted successfully",
                            "bookingId", saved.getId(),
                            "date", saved.getDate(),
                            "time", saved.getTime()
                    )
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "Something went wrong: " + e.getMessage()));
        }
    }

    // Email methods (unchanged)
    
    private void sendMail(ReviewPortfolio request) throws MessagingException, IOException {
        Resource template = resourceLoader.getResource("classpath:templates/review-portfolio-thankyou.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template not found: templates/review-portfolio-thankyou.html");
        }

        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(request.getFullName()))
                .replace("{{email}}", escapeHtml(request.getEmail()))
                .replace("{{contactNumber}}", escapeHtml(request.getContactNumber()))
                .replace("{{investmentValue}}", escapeHtml(request.getInvestmentRange()));

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(request.getEmail());
        helper.setSubject("Thank You for Your Portfolio Review Request - Investza");
        helper.setText(html, true);

        mailSender.send(mimeMessage);

        System.out.println("Email sent successfully to: " + request.getEmail());
    }

    private String escapeHtml(String s) {
        if (s == null) {
            return "";
        }
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }

    private void notifySender(ReviewPortfolio request) throws MessagingException, IOException {
        Resource template = resourceLoader.getResource("classpath:templates/review-portfolio-notification.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template not found: templates/review-portfolio-notification.html");
        }

        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(request.getFullName()))
                .replace("{{email}}", escapeHtml(request.getEmail()))
                .replace("{{contactNumber}}", escapeHtml(request.getContactNumber()))
                .replace("{{investmentValue}}", escapeHtml(request.getInvestmentRange()));

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(getNotificationMail);
        helper.setSubject("New Portfolio Review Request - Investza");
        helper.setText(html, true);

        mailSender.send(message);

        System.out.println("Notification email sent successfully");
    }

    // Get all requests with optional status filter
    @Override
    public List<ReviewPortfolio> getAll() {
        return reviewPortfolioRepository.findAll();
    }

    // Get request by ID
    @Override
    public ReviewPortfolio getRequestById(String id) {
        return reviewPortfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review portfolio request not found with id: " + id));
    }


    
    // Update only status
    @Override
    public ReviewPortfolio updateStatus(String id, String status) {
        ReviewPortfolio existing = getRequestById(id);
        existing.setStatus(status);
        return reviewPortfolioRepository.save(existing);
    }
    
    
    // Delete request
    @Override
    public void deleteRequest(String id) {
        ReviewPortfolio existing = getRequestById(id);
        reviewPortfolioRepository.delete(existing);
    }
    
    // Get statistics
    @Override
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", reviewPortfolioRepository.count());
        stats.put("pending", reviewPortfolioRepository.countByStatus("PENDING"));
        stats.put("done", reviewPortfolioRepository.countByStatus("DONE"));
        return stats;
    }

    @Transactional
    @Override
    public ReviewPortfolio updateReviewPortfolio(String id, UpdateBookingRequest req) {

        ReviewPortfolio existing = reviewPortfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review Portfolio not found with id: " + id));

        if (req.getFullName() != null) existing.setFullName(req.getFullName());
        if (req.getMobile() != null) existing.setContactNumber(req.getMobile());
        if (req.getEmail() != null) existing.setEmail(req.getEmail());
        if (req.getGuestEmail() != null) existing.setGuestEmail(req.getGuestEmail());
        if (req.getMessage() != null) existing.setMessage(req.getMessage());
        if (req.getInvestmentRange() != null) existing.setInvestmentRange(req.getInvestmentRange());
        if (req.getDate() != null) existing.setDate(req.getDate());
        if (req.getTime() != null) existing.setTime(req.getTime());

        return reviewPortfolioRepository.save(existing);
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveUnavailableSlots(UnavailabilityTimeSlotsRequest req) {
        try {
            LocalDate parsedDate = LocalDate.parse(req.getDate());

            PortfolioReviewer existing =
                    availabilityRepo.findByHandlerIdAndDate(req.getAdminId(), parsedDate);

            if (existing != null) {
                // Update (avoid duplicates)
                Set<String> updatedSlots = new HashSet<>(existing.getUnavailableSlots());
                updatedSlots.addAll(req.getTimeSlots());

                existing.setUnavailableSlots(new ArrayList<>(updatedSlots));
                availabilityRepo.save(existing);

                return ResponseEntity.ok(
                        new ApiResponse(true, "Unavailable slots updated successfully")
                );
            }

            // Create new
            PortfolioReviewer newEntry = PortfolioReviewer.builder()
                    .handlerId(req.getAdminId())
                    .date(parsedDate)
                    .unavailableSlots(req.getTimeSlots())
                    .build();

            availabilityRepo.save(newEntry);

            return ResponseEntity.ok(
                    new ApiResponse(true, "Unavailable slots saved successfully")
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    @Override
    public ResponseEntity<?> getUnavailabilities(String date, String id) {
        try {
            LocalDate parsedDate = LocalDate.parse(date);

            PortfolioReviewer existing =
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
