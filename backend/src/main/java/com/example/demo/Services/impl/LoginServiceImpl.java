package com.example.demo.Services.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

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
import com.example.demo.util.JwtUtil;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AdminRepository AdminRepo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private JwtUtil jwtUtil;    

    @Override
    public ResponseEntity<ApiResponse> addAdmin(AddAdminRequest req) {

        // ---- ROLE VALIDATION ----
        Set<String> allowedRoles = Set.of(
                "ADMIN",
                "CALL_HANDLER",
                "PORTFOLIO_HANDLER"
        );

        if (req.getRole() == null ||
            !allowedRoles.contains(req.getRole().trim().toUpperCase())) {

            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,
                            "Invalid role. Allowed roles are ADMIN, CALL_HANDLER, PORTFOLIO_HANDLER"));
        }

        // Normalize role
        String role = req.getRole().trim().toUpperCase();

        // Check if Admin already exists
        Optional<Admin> existing =
                AdminRepo.findByAdminNameOrEmail(req.getAdminName(), req.getEmail());

        if (existing.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,
                            "Admin already exists with this Adminname/email"));
        }

        // Create new Admin
        Admin admin = new Admin();
        admin.setAdminName(req.getAdminName());
        admin.setEmail(req.getEmail());
        admin.setPassword(passwordEncoder.encode(req.getPassword()));
        admin.setRole(role);

        try {
            AdminRepo.save(admin);
            return ResponseEntity.ok(
                    new ApiResponse(true, "Admin created successfully"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }


    @Override
    public ResponseEntity<?> login(LoginRequest req) {

        // Find Admin by Adminname OR email
        Optional<Admin> optionalAdmin = AdminRepo.findByAdminNameOrEmail(req.getAdminName(), req.getAdminName());

        if (!optionalAdmin.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid Adminname/email or password"));
        }

        Admin admin = optionalAdmin.get();

        // Check password
        if (!passwordEncoder.matches(req.getPassword(), admin.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid Adminname/email or password"));
        }

        String token = jwtUtil.generateToken(admin);

        return ResponseEntity.ok(Map.of(
            "token", token,
            "role", admin.getRole(),
            "adminId", admin.getId()
        ));
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

    @Override
    public ResponseEntity<?> countAdmin(){
        return ResponseEntity.ok(Map.of("count", AdminRepo.count()));
    }
}
