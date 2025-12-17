package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.LoginService;
import com.example.demo.dto.AddAdminRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.ChangeRoleRequest;
import com.example.demo.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return loginService.login(req);
    }

    @PostMapping("/add-admin")
    public ResponseEntity<ApiResponse> createAdmin(@RequestBody AddAdminRequest req){
        return loginService.addAdmin(req);
    }

    @GetMapping("/admin/list")
    public ResponseEntity<?> getAllAdmins(){
        return loginService.getAllAdmins();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteAdmin(@PathVariable String id){
        return loginService.deleteAdmin(id);
    }

    @PostMapping("/change-role")
    public ResponseEntity<ApiResponse> changeAdminRole(@RequestBody ChangeRoleRequest req) {
        return loginService.changeAdminRole(req);
    }

    @GetMapping("/count")
    public ResponseEntity<?> countAdmin(){
        return loginService.countAdmin();
    }
}
