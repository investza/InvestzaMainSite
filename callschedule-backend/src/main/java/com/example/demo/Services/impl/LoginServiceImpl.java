package com.example.demo.Services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Models.Admin;
import com.example.demo.Repositories.AdminRepository;
import com.example.demo.Services.LoginService;
import com.example.demo.dto.AddAdminRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ChangeRoleRequest;
import com.example.demo.dto.LoginRequest;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AdminRepository AdminRepo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<ApiResponse> addAdmin(AddAdminRequest req) {

        // Check if Admin already exists by Adminname or email
        Optional<Admin> existing = AdminRepo.findByAdminNameOrEmail(req.getAdminName(), req.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Admin already exists with this Adminname/email"));
        }

        // Create new Admin
        Admin Admin = new Admin();
        Admin.setAdminName(req.getAdminName());
        Admin.setEmail(req.getEmail());
        Admin.setPassword(passwordEncoder.encode(req.getPassword())); // Encrypt password
        Admin.setRole("Admin");


        try{
            AdminRepo.save(Admin);
            return ResponseEntity.ok(new ApiResponse(true, "Admin created successfully"));
        }catch(Exception e){
            return ResponseEntity.status(500).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<ApiResponse> login(LoginRequest req) {

        // Find Admin by Adminname OR email
        Optional<Admin> optionalAdmin = AdminRepo.findByAdminNameOrEmail(req.getAdminName(), req.getAdminName());

        if (!optionalAdmin.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid Adminname/email or password"));
        }

        Admin Admin = optionalAdmin.get();

        // Check password
        if (!passwordEncoder.matches(req.getPassword(), Admin.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid Adminname/email or password"));
        }

        // Login success
        return ResponseEntity.ok(new ApiResponse(true, "Login successful!"));
    }

    @Override
    public ResponseEntity<ApiResponse> deleteAdmin(String id) {

        Optional<Admin> existing = AdminRepo.findById(id);
        if (!existing.isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Admin not found"));
        }

        AdminRepo.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Admin deleted successfully"));
    }

    @Override
    public ResponseEntity<?> getAllAdmins() {
        List<Admin> Admins = AdminRepo.findAll();
        return ResponseEntity.ok(Admins);
    }

    @Override
    public ResponseEntity<ApiResponse> changeAdminRole(ChangeRoleRequest req){
        Optional<Admin> optionalAdmin = AdminRepo.findById(req.getAdminId());

        if (!optionalAdmin.isPresent()) {
            return ResponseEntity.status(404)
                    .body(new ApiResponse(false, "Admin not found"));
        }

        Admin Admin = optionalAdmin.get();
        Admin.setRole(req.getRole());
        AdminRepo.save(Admin);

        return ResponseEntity.ok(
                new ApiResponse(true, "Admin role updated successfully")
        );
    }
}
