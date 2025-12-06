package com.example.demo.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "admin_table")
public class Admin {

    @Id
    private String id;

    private String adminName;
    private String email;
    private String password;
    private String role;

}
