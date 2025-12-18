package com.example.demo.dto;

import lombok.Data;

@Data
public class AddAdminRequest {
    private String adminName;
    private String email;
    private String password;
    private String role;
}
