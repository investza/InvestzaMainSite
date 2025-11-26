package com.example.demo.Services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.Models.ReviewPortfolio;
import com.example.demo.Repositories.ReviewPortfolioRepository;
import com.example.demo.dto.ReviewPortfolioRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ReviewPortfolioService {

    @Autowired
    private ReviewPortfolioRepository repository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void saveForm(ReviewPortfolioRequest request) {
        // Save to database first
        ReviewPortfolio form = new ReviewPortfolio(
                request.getFullName(),
                request.getContactNumber(),
                request.getInvestmentValue(),
                request.getEmail(),
                request.getAgreeToPolicy()
        );
        repository.save(form);

        try {
            sendMail(request);
            notifySender(request);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Send thank you email to user
    private void sendMail(ReviewPortfolioRequest request) throws MessagingException, IOException {
        // Load email template
        Resource template = resourceLoader.getResource("classpath:templates/review-portfolio-thankyou.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template not found: templates/review-portfolio-thankyou.html");
        }

        // Read and populate template
        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(request.getFullName()))
                .replace("{{email}}", escapeHtml(request.getEmail()))
                .replace("{{contactNumber}}", escapeHtml(request.getContactNumber()))
                .replace("{{investmentValue}}", escapeHtml(request.getInvestmentValue()));

        // Create and send email
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

    // Send notification email to admin/sender
    private void notifySender(ReviewPortfolioRequest request) throws MessagingException, IOException {
        // Load notification template
        Resource template = resourceLoader.getResource("classpath:templates/review-portfolio-notification.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template not found: templates/review-portfolio-notification.html");
        }

        // Read and populate template
        String html = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                .replace("{{name}}", escapeHtml(request.getFullName()))
                .replace("{{email}}", escapeHtml(request.getEmail()))
                .replace("{{contactNumber}}", escapeHtml(request.getContactNumber()))
                .replace("{{investmentValue}}", escapeHtml(request.getInvestmentValue()));

        // Create and send email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(fromEmail);
        helper.setSubject("New Portfolio Review Request - Investza");
        helper.setText(html, true);

        mailSender.send(message);

        System.out.println("Notification email sent successfully");
    }
}