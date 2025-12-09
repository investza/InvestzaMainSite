package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
@Service
public class RealSmsService implements SmsService {

    @Value("${sms.enabled:true}")
    private boolean smsEnabled;

    @Value("${authkey.key}")
    private String authKey;

    @Value("${authkey.callSchedulingSid}")
    private String callSchedulingSid;

    @Value("${authkey.reviewPortfolioSid}")
    private String reviewPortfolioSid;

    private final RestTemplate restTemplate;

    public RealSmsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String sendCallSchedulingSms(String mobile, String otp) {
        return sendSmsInternal(mobile, otp, callSchedulingSid);
    }

    @Override
    public String sendReviewPortfolioSms(String mobile, String otp) {
        return sendSmsInternal(mobile, otp, reviewPortfolioSid);
    }

    private String sendSmsInternal(String mobile, String otp, String sid) {

        if (!smsEnabled) return "SMS Disabled";
        if (authKey == null || authKey.isBlank()) return "Missing AuthKey";

        final String DATE_PLACEHOLDER = "your scheduled call";

        try {
            String url = UriComponentsBuilder.fromHttpUrl("https://api.authkey.io/request")
                    .queryParam("authkey", authKey)
                    .queryParam("mobile", mobile)
                    .queryParam("sid", sid)
                    .queryParam("country_code", "91")
                    .queryParam("date_time", DATE_PLACEHOLDER)
                    .queryParam("otp", otp)
                    .toUriString();

            System.out.println("SMS URL => " + url);
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("SMS RESPONSE => " + response);

            return response;

        } catch (Exception e) {
            return "FAILED: " + e.getMessage();
        }
    }
}
