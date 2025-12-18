package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {}) 
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()

                // -------- PUBLIC APIs --------
                .requestMatchers(
                    "/api/auth/login",
                    "/api/contact/receive",
                    "/api/events/list",
                    "/api/events/event/**",

                    "/api/review_portfolio/start",
                    "/api/review_portfolio/send-otp",
                    "/api/review_portfolio/verify-otp",
                    "/api/review_portfolio/investment",
                    "/api/review_portfolio/check-slot",
                    "/api/review_portfolio/submit",

                    "/api/flow/start",
                    "/api/flow/send-otp",
                    "/api/flow/verify-otp",
                    "/api/flow/investment",
                    "/api/flow/create-booking",
                    "/api/flow/check-slot"
                ).permitAll()

                // -------- PROTECTED ADMIN APIs --------
                .requestMatchers(
                    "/api/auth/**",
                    "/api/review_portfolio/**",
                    "/api/events/**",
                    "/api/contact/**",
                    "/api/flow/**"
                )
                .hasAnyRole("ADMIN", "CALL_HANDLER", "PORTFOLIO_HANDLER")

                .anyRequest().authenticated()
            )

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }

}
