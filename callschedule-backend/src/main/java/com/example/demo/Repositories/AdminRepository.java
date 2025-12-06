package com.example.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.Models.Admin;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {

    Optional<Admin> findByAdminNameOrEmail(String adminName, String email);
    long countByRole(String role);
}
