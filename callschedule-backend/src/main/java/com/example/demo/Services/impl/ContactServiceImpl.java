package com.example.demo.Services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.Models.ContactMessage;
import com.example.demo.Repositories.ContactMessageRepository;
import com.example.demo.Services.ContactService;
import com.example.demo.dto.ContactMessageRequest;

import jakarta.mail.internet.MimeMessage;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ContactMessageRepository repo;

    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // flow will be proceed
    @Override
    public void processForm(ContactMessageRequest dto) {

        repo.save(dtoToEntity(dto)); // user data will be save in db
        try {
            sendMail(dto);  // confirmation mail will be send to user
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // convert dto -> entity
    private ContactMessage dtoToEntity(ContactMessageRequest dto) {
        ContactMessage m = new ContactMessage();
        m.setName(dto.getName());
        m.setEmail(dto.getEmail());
        m.setSubject(dto.getSubject());
        m.setMessage(dto.getMessage());
        return m;
    }

    // for sending mail to user
    private void sendMail(ContactMessageRequest msg) throws Exception {
        Resource template = resourceLoader.getResource("classpath:templates/contact-thankyou.html");
        if (!template.exists()) {
            throw new RuntimeException("Email template missing");
        }

        String html = new String(template.getInputStream().readAllBytes())
                .replace("{{name}}", escapeHtml(msg.getName()));

        MimeMessage mime = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(msg.getEmail());
        helper.setSubject("Thank You for Contacting Us - Investza");
        helper.setText(html, true);

        mailSender.send(mime);
    }

    private String escapeHtml(String s) {
        if (s == null) {
            return "";
        }
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }
}
