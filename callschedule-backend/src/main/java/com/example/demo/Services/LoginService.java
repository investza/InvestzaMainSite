package com.example.demo.Services;

import org.springframework.http.ResponseEntity;

import com.example.demo.dto.AddAdminRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.ChangeRoleRequest;



public interface LoginService {
    ResponseEntity<ApiResponse> login(LoginRequest req);
    ResponseEntity<ApiResponse> addAdmin(AddAdminRequest req);
    ResponseEntity<ApiResponse> deleteAdmin(String id);
    ResponseEntity<?> getAllAdmins(); 
    ResponseEntity<ApiResponse> changeAdminRole(ChangeRoleRequest req);
    ResponseEntity<?> countAdmin();
}
